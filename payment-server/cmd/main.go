package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"payment-server/internal/config"
	controllers "payment-server/internal/controllers/lotto"
	orderControllers "payment-server/internal/controllers/order"
	"payment-server/internal/repositories/lotto"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/routers"
	lottoUsecase "payment-server/internal/usecase/lotto"
	orderUsecase "payment-server/internal/usecase/order"
	"payment-server/internal/watchers"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// 애플리케이션 진입점
func main() {
	// .env파일 로드
	err := config.LoadEnv()
	if err != nil {
		log.Fatal("환경 변수를 로드하지 못했습니다:", err)
	}

	client, err := mongodb.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	dbName := config.DBName()

	// 레포지토리 초기화
	paymentRepo := mongodb.NewPaymentRepository(client, dbName)
	paymentRepo.CreateTTLIndex()
	userRepo := mongodb.NewUserRepository(client, dbName)
	sessionRepo := mongodb.NewSessionRepository(client, dbName)
	orderRepo := mongodb.NewOrderRepository(client, dbName) // OrderRepository 생성

	go watchers.WatchPaymentDeletions(client, userRepo)

	// S3 Repository 초기화
	s3Repo, err := lotto.NewS3Repository(
		os.Getenv("HISTORY_BUCKET"),
		os.Getenv("HISTORY_PREFIX"),
	)
	if err != nil {
		log.Fatal("S3 Repository 초기화 실패:", err)
	}

	// Lotto Usecase 초기화
	lottoUsecase := lottoUsecase.NewLottoUsecase(s3Repo)

	orderUsecase := orderUsecase.NewOrderUsecase(userRepo, sessionRepo, orderRepo, lottoUsecase, client) // OrderUsecase 생성

	// Lotto Controller 초기화
	lottoController := controllers.NewLottoController(lottoUsecase)

	orderController := orderControllers.NewOrderController(orderUsecase)

	e := echo.New()

	// 세션 미들웨어 설정
	CookieSecretKey := config.CookieSecret()
	store := sessions.NewCookieStore([]byte(CookieSecretKey))
	store.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   360000,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
	}

	e.Use(session.Middleware(store))

	//CORS설정
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{config.ClientURL()},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodOptions, http.MethodPatch, http.MethodDelete},
		AllowCredentials: true,
	}))

	// 미들웨어
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// 라우트 설정
	routers.SetupRoutes(e, client, userRepo, paymentRepo, sessionRepo, lottoController, orderController)

	// 서버 시작
	// 개발 환경인지 확인
	isDevelopment := os.Getenv("NODE_ENV") == "development"
	port := config.Port()

	if isDevelopment {
		// HTTPS 설정
		certFile := config.CertPath()
		keyFile := config.KeyPath()

		// HTTPS 서버 실행
		log.Printf("Starting HTTPS server on port %s", port)
		e.Logger.Fatal(e.StartTLS(":"+port, certFile, keyFile))
	} else {
		// HTTP 서버 실행
		log.Printf("Starting HTTP server on port %s", port)
		e.Logger.Fatal(e.Start(":" + port))
	}
}

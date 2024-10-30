package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"payment-server/config"
	"payment-server/db"
	"payment-server/routers"

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

	client, err := db.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

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
	routers.SetupRoutes(e, client)

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

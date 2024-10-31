/*
routers 패키지는 애플리케이션의 라우터를 정의하고 핸들러를 연결한다.
*/

package routers

import (
	"payment-server/internal/config"
	controllers "payment-server/internal/controllers/kakaopay"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/services/kakaopay"
	usecase "payment-server/internal/usecase/kakaopay"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// SetupRoutes는 라우터를 설정합니다.
func SetupRoutes(e *echo.Echo, client *mongo.Client) {
	dbName := config.DBName()

	// 레포지토리 설정
	userRepo := mongodb.NewUserRepository(client, dbName)
	paymentRepo := mongodb.NewPaymentRepository(client, dbName)
	sessionRepo := mongodb.NewSessionRepository(client, dbName)

	// 서비스 설정
	kakaoService := kakaopay.NewKakaoPayService()

	// 유즈케이스 설정
	paymentUsecase := usecase.NewPaymentUsecase(paymentRepo, userRepo, sessionRepo, kakaoService)
	paymentUsecase.UserRepo = userRepo

	// 핸들러 설정
	kakaoPayHandler := controllers.NewPaymentHandler(paymentUsecase)

	e.POST("/pay", kakaoPayHandler.CreatePayment)
	e.POST("/pay/approval", kakaoPayHandler.PayApproveHandler)
}

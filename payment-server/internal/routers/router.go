/*
routers 패키지는 애플리케이션의 라우터를 정의하고 핸들러를 연결한다.
*/

package routers

import (
	kakaoControllers "payment-server/internal/controllers/kakaopay"
	queryControllers "payment-server/internal/controllers/lookup"
	controllers "payment-server/internal/controllers/lotto"
	orderControllers "payment-server/internal/controllers/order"
	"payment-server/internal/helpers"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/services/kakaopay"
	kakaoUsecase "payment-server/internal/usecase/kakaopay"
	queryUsecase "payment-server/internal/usecase/lookup"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// SetupRoutes는 라우터를 설정합니다.
func SetupRoutes(e *echo.Echo, client *mongo.Client, userRepo *mongodb.UserRepository, paymentRepo *mongodb.PaymentRepository, sessionRepo *mongodb.SessionRepository, lottoController *controllers.LottoController, orderController *orderControllers.OrderController, orderRepo *mongodb.OrderRepository) {
	// 서비스 설정
	kakaoService := kakaopay.NewKakaoPayService()

	// 유즈케이스 설정
	paymentUsecase := kakaoUsecase.NewPaymentUsecase(paymentRepo, userRepo, sessionRepo, kakaoService)
	paymentUsecase.UserRepo = userRepo

	// 핸들러 설정
	kakaoPayHandler := kakaoControllers.NewPaymentHandler(paymentUsecase)

	e.POST("/pay", kakaoPayHandler.CreatePayment)
	e.POST("/pay/approval", kakaoPayHandler.PayApproveHandler)

	// 결제 조회 관련 라우팅 설정
	paymentQueryUsecase := queryUsecase.NewPaymentQueryUsecase(paymentRepo, userRepo, sessionRepo)
	sessionHelper := helpers.NewSessionHelper(sessionRepo)
	paymentQueryHandler := queryControllers.NewPaymentQueryHandler(paymentQueryUsecase, sessionHelper)
	orderQueryUsecase := queryUsecase.NewOrderQueryUsecase(orderRepo, userRepo, sessionRepo)
	orderQueryHandler := queryControllers.NewOrdersQueryHandler(orderQueryUsecase, sessionHelper)

	e.GET("/payment-history", paymentQueryHandler.GetPayments)
	e.GET("/order-history", orderQueryHandler.GetOrders)

	// 로또 관련 라우트
	lottoGroup := e.Group("/api")
	{
		lottoGroup.GET("/latest", lottoController.GetLatestLottoData)
		lottoGroup.GET("/round/:round", lottoController.GetLottoDataForRound)

		// 주문 관련 라우터
		lottoGroup.POST("/unique-order/:pay_order_id", orderController.OrderHandler)
	}
}

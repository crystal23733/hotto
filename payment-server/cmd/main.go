package main

import (
	"context"
	"log"
	"net/http"
	"payment-server/config"
	"payment-server/db"
	"payment-server/routers"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// 결제 요청을 나타내는 구조체
type PaymentRequest struct {
	Option    string `json:"option"`
	SessionID string `json:"session_id"`
}

// 애플리케이션 진입점
func main() {
	client, err := db.ConnectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	e := echo.New()


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
	port := config.Port()
	e.Logger.Fatal(e.Start(":" + port))
}

package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type PaymentRequest struct {
	Price     int    `json:"price"`
	SessionID string `json:"session_id"`
}

// 애플리케이션 진입점
func main() {
	e := echo.New()

	// .env파일 로드
	err := godotenv.Load()
	if err != nil {
		log.Println("환경변수를 찾을 수 없습니다.")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	client_url := os.Getenv("CLIENT_URL")

	//CORS설정
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins:     []string{client_url},
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodOptions, http.MethodPatch, http.MethodDelete},
		AllowCredentials: true,
	}))

	// 미들웨어
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	//라우트
	e.POST("/pay", func(c echo.Context) error {
		// 요청 본문을 읽음
		body, err := io.ReadAll(c.Request().Body)
		if err != nil {
			return c.String(http.StatusBadRequest, "요청 본문을 읽는 데 실패했습니다")
		}

		// body를 JSON으로 파싱
		var data interface{}
		err = json.Unmarshal(body, &data)
		if err != nil {
			// JSON 파싱에 실패한 경우, 원본 데이터를 문자열로 출력
			fmt.Printf("수신된 데이터 (원본): %s\n", string(body))
			return c.String(http.StatusOK, "비 JSON 데이터 수신됨")
		}

		// 파싱된 JSON 데이터 출력
		fmt.Printf("수신된 데이터 (JSON): %+v\n", data)

		return c.JSON(http.StatusOK, map[string]string{
			"message": "데이터 수신됨",
		})
	})

	e.Logger.Fatal(e.Start(":" + port))
}

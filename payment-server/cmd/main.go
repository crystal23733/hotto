package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// 결제 요청을 나타내는 구조체
type PaymentRequest struct {
	Option    string `json:"option"`
	SessionID string `json:"session_id"`
}

// 애플리케이션 진입점
func main() {
	client, err := connectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	e := echo.New()


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
		// 클라이언트가 제공한 세션 쿠키 가져오기
		sessionID, err := c.Cookie("LIN_HOTTO")
		if err != nil {
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션 쿠키를 찾을 수 없습니다."})
		}

		//세션ID URL디코딩
		decodedSessionID, err := url.QueryUnescape(sessionID.Value)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID를 디코딩하는 데 실패했습니다."})
		}

		// 세션 ID에서 실제 세션 ID 추출
		// 예시: "s:rQiAJCvE3YCS8qkmD3TO1tKLdF4NRgCO.UzOO+MND8le0SFK6p90F8P+oLDLhQmK/azvUythZb2Q"
		// 실제 세션 ID는 "rQiAJCvE3YCS8qkmD3TO1tKLdF4NRgCO"
		parts := strings.Split(decodedSessionID, ":")
		if len(parts) < 2 {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID 형식이 잘못되었습니다."})
		}
		sessionAndRest := parts[1]
		sessionParts := strings.Split(sessionAndRest, ".")
		actualSessionID := sessionParts[0]

		//DB세션정보 조회
		sessionCollection := client.Database(db_name).Collection("sessions") // 세션 컬렉션
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		//세션ID를 나타내는 구조체
		var sessionDoc struct {
			Session string `bson:"session"` // 세션 데이터를 담는 필드
		}

		//session ID로 세션 문서 조회
		err = sessionCollection.FindOne(ctx, bson.M{"_id": actualSessionID}).Decode(&sessionDoc)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
			}

			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
		}

		//세션 필드 내의 문자열을 JSON으로 파싱
		var sessionData struct {
			UserID string `json:"userId"`
		}
		err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
		if err != nil {
			log.Printf("[ERROR]세션 데이터 파싱 실패:%v\n", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "세션 데이터를 파싱하는데 실패하였습니다."})
		}

		userID := sessionData.UserID

		if userID == "" {
			log.Printf("[ERROR]세션에 유효한 사용자가 없습니다!\n")
			return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션에 유효한 사용자가 없습니다."})
		}

		//사용자의 정보를 나타내는 구조체
		type User struct {
			ID      string `json:"_id" bson:"_id"`
			Name    string `json:"name" bson:"name"`
			Email   string `json:"email" bson:"email"`
			Balance int    `json:"balance" bson:"balance"`
		}

		//userID로 users컬렉션 조회
		userCollection := client.Database(db_name).Collection("users")
		var user User
		objectID, err := primitive.ObjectIDFromHex(userID)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "유효하지 않은 ID입니다."})
		}

		err = userCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Printf("사용자 에러")
				return c.JSON(http.StatusNotFound, map[string]string{"error": "사용자를 찾을 수 없습니다."})
			}
			log.Printf("데이터 에러")
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
		}

		log.Printf("찾은 사용자 데이터:%+v\n", user)

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

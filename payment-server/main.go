package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//결제 요청을 나타내는 구조체
type PaymentRequest struct {
	Option     string    `json:"option"`
	SessionID string `json:"session_id"`
}

//MongoDB에 연결하고 클라이언트를 반환하는 함수
func connectDB() (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	db_url := os.Getenv("DB_URL")
	log.Println("DB 연결중...")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(db_url))
	if err != nil {
		log.Println("DB연결에 실패하였습니다.")
			return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		 	log.Println("DB연결이 확인되지 않습니다.")
			return nil, err
	}
	log.Println("DB에 성공적으로 연결하였습니다.")
	return client, nil
}

// 애플리케이션 진입점
func main() {
	// .env파일 로드
	err := godotenv.Load()
	if err != nil {
		log.Println("환경변수를 찾을 수 없습니다.")
	}
	client, err := connectDB()
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.Background())

	e := echo.New()

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
		// 클라이언트가 제공한 세션 쿠키 가져오기
    sessionID, err := c.Cookie("LIN_HOTTO")
    if err != nil {
        log.Printf("[ERROR] 세션 쿠키를 찾을 수 없습니다: %v\n", err)
        return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션 쿠키를 찾을 수 없습니다."})
    }
    log.Printf("[INFO] 세션 ID: %s\n", sessionID.Value)
		db_name := os.Getenv("DB_NAME")

		//세션ID URL디코딩
		decodedSessionID, err := url.QueryUnescape(sessionID.Value)
		if err!=nil {
			log.Printf("sessionID 디코딩실패!:%v\n", err)
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID를 디코딩하는 데 실패했습니다."})
		}
		log.Printf("[INFO] 디코딩된 세션 ID: %s\n", decodedSessionID)

		// 세션 ID에서 실제 세션 ID 추출
		// 예시: "s:rQiAJCvE3YCS8qkmD3TO1tKLdF4NRgCO.UzOO+MND8le0SFK6p90F8P+oLDLhQmK/azvUythZb2Q"
		// 실제 세션 ID는 "rQiAJCvE3YCS8qkmD3TO1tKLdF4NRgCO"
		parts := strings.Split(decodedSessionID, ":")
		if len(parts) < 2 {
			log.Printf("[ERROR] 세션 ID 형식이 잘못되었습니다: %s\n", decodedSessionID)
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID 형식이 잘못되었습니다."})
		}
		sessionAndRest := parts[1]
		sessionParts := strings.Split(sessionAndRest, ".")
		actualSessionID := sessionParts[0]
		log.Printf("[INFO] 추출된 실제 세션 ID: %s\n", actualSessionID)

		//DB세션정보 조회
		sessionCollection := client.Database(db_name).Collection("sessions") // 세션 컬렉션
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
	
		//세션ID를 나타내는 구조체
		var sessionDoc struct {
			Session string `bson:"session"` // 세션 데이터를 담는 필드
		}

		//session ID로 세션 문서 조회
		err = sessionCollection.FindOne(ctx, bson.M{"_id":actualSessionID}).Decode(&sessionDoc)
		if err != nil {
			if err == mongo.ErrNoDocuments {
					log.Printf("[ERROR] 세션을 찾을 수 없습니다: %v\n", err)
					return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
			}
			log.Printf("[ERROR] 세션 문서 조회 오류: %v\n", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
		}
		log.Printf("[INFO] 세션 데이터 조회 성공: %s\n", sessionDoc.Session)

		//세션 필드 내의 문자열을 JSON으로 파싱
		var sessionData struct {
			UserID string `json:"userId"`
		}
		err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
		if err!=nil {
			log.Printf("[ERROR]세션 데이터 파싱 실패:%v\n", err)
			return c.JSON(http.StatusInternalServerError, map[string]string{"error":"세션 데이터를 파싱하는데 실패하였습니다."})
		}
		log.Printf("파싱된 데이터:%s\n", sessionData);

		//사용자의 정보를 나타내는 구조체
		type User struct {
			ID string `json:"_id" bson:"_id"`
			Name string `json:"name" bson:"name"`
			Email string `json:"email" bson:"email"`
			Balance int `json:"balance" bson:"balance"`	
		}
		
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

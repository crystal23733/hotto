/*
controllers 패키지는 HTTP 요청을 처리하는 핸들러 함수를 포함한다.
PayHandler는 /pay 경로에 대한 요청을 처리한다.
*/

package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"payment-server/config"
	"payment-server/models"
	"payment-server/payment"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// PayHandler는 /pay 경로에 대한 핸들러 함수이다.
// 클라이언트의 세션 쿠키를 검증하고, 세션 정보를 조회한 후 요청 본문을 처리한다.
func PayHandler(c echo.Context, client *mongo.Client) error {
	// 클라이언트가 제공하는 세션 쿠키 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션 쿠키를 찾을 수 없습니다."})
	}

	// 세션 ID URL 디코딩
	decodedSessionID, err := url.QueryUnescape(sessionID.Value)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션을 디코딩하는데 실패하였습니다."})
	}

	// 세션 ID에서 실제 세션 ID 추출
	// 예시: "s:jf8e9fyg927hogh8.39ah9fha3hag83fghfhajinw3h
	// 실제 세션 ID : jf8e9fyg927hogh8
	parts := strings.Split(decodedSessionID, ":")
	if len(parts) < 2 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID 형식이 잘못되었습니다."})
	}
	sessionAndRest := parts[1]
	sessionParts := strings.Split(sessionAndRest, ".")
	actualSessionID := sessionParts[0]
	log.Printf("[INFO] MongoDB에서 조회할 세션 ID: %s", actualSessionID)
	// DB 세션정보 조회
	dbName := config.DBName() // 환경변수에서 가져온 값
	sessionCollection := client.Database(dbName).Collection("sessions")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 세션 ID를 나타내는 구조체
	var sessionDoc struct {
		Session string `bson:"session"` // 세션 데이터를 담는 필드
	}

	// session ID로 세션 문서 조회
	err = sessionCollection.FindOne(ctx, bson.M{"_id": actualSessionID}).Decode(&sessionDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			log.Printf("[ERROR] 세션을 찾을 수 없습니다: %v", err)
			return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
	}

	// 세션 필드 내의 문자열을 JSON으로 파싱
	var sessionData struct {
		UserID string `json:"userId"`
	}
	err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 파싱하는데 실패하였습니다."})
	}

	userID := sessionData.UserID
	if userID == "" {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션에 유효한 사용자가 없습니다."})
	}

	//userID로 users컬렉션 조회
	userCollection := client.Database(dbName).Collection("users")
	var user models.User
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "유효하지 않은 ID입니다."})
	}

	err = userCollection.FindOne(ctx, bson.M{"_id": objectID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "사용자를 찾을 수 없습니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
	}

	log.Printf("찾은 사용자 데이터:%+v\n", user)

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.String(http.StatusBadRequest, "요청 본문을 읽는데 실패했습니다")
	}

	// body를 JSON으로 파싱
	var requestData struct {
		Option int `json:"option"`
	}
	err = json.Unmarshal(body, &requestData)
	if err != nil {
		fmt.Printf("수신된 데이터 (원본): %s\n", string(body))
		return c.String(http.StatusOK, "비 JSON 데이터 수신됨")
	}

	// 카카오페이 클라이언트 생성
	kakaoClient := payment.NewKakaoPayClient()

	// 가맹점 주문번호 생성
	partnerOrderID := fmt.Sprintf("order-%d", time.Now().Unix())

	// 카카오페이 결제 요청
	kakaoPayRequest := models.KakaoPayRequest{
		Cid:            kakaoClient.Cid,
		CidSecret:      kakaoClient.CidSecret,
		PartnerOrderId: partnerOrderID,
		PartnerUserId:  user.ID,
		ItemName:       fmt.Sprintf("%d", requestData.Option), // option값을 문자열로 반환
		Quantity:       1,
		TotalAmount:    requestData.Option,
		TaxFreeAmount:  requestData.Option,
		ApprovalUrl:    config.ClientURL() + "/payment/success",
		CancelUrl:      config.ClientURL() + "/payment/cancel",
		FailUrl:        config.ClientURL() + "/payment/fail",
	}

	// 결제 요청을 위해 카카오페이에 전송(결제 준비)
	response, err := kakaoClient.RequestPayment(kakaoPayRequest)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "카카오페이 결제 요청에 실패하였습니다."})
	}
	// 파싱된 JSON데이터 출력
	fmt.Printf("수신된 데이터 (JSON): %+v\n", response)
	return c.JSON(http.StatusOK, response)
}

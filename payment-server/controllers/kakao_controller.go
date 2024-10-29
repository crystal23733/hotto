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
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PayHandler는 /pay 경로에 대한 핸들러 함수이다.
// 클라이언트의 세션 쿠키를 검증하고, 세션 정보를 조회한 후 요청 본문을 처리한다.
func PayHandler(c echo.Context, client *mongo.Client) error {
	// 클라이언트가 제공하는 세션 쿠키 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {
		log.Printf("세션 쿠키를 찾을 수 없음")
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": "세션 쿠키를 찾을 수 없습니다."})
	}
	log.Printf("세션 %s", sessionID)
	// 세션 ID URL 디코딩
	decodedSessionID, err := url.QueryUnescape(sessionID.Value)
	if err != nil {
		log.Printf("세션 디코딩 실패")
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션을 디코딩하는데 실패하였습니다."})
	}

	// 세션 ID에서 실제 세션 ID 추출
	parts := strings.Split(decodedSessionID, ":")
	if len(parts) < 2 {
		log.Printf("세션 형식 에러")
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID 형식이 잘못되었습니다."})
	}
	sessionAndRest := parts[1]
	sessionParts := strings.Split(sessionAndRest, ".")
	actualSessionID := sessionParts[0]
	log.Printf("해독된 세션 %s", actualSessionID)
	// DB 세션 정보 조회
	dbName := config.DBName()
	sessionCollection := client.Database(dbName).Collection("sessions")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var sessionDoc struct {
		Session string `bson:"session"`
	}

	err = sessionCollection.FindOne(ctx, bson.M{"_id": actualSessionID}).Decode(&sessionDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
		}
		log.Printf("데이터베이스 오류")
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
	}
	log.Printf("세션 %+v", sessionDoc)

	// 세션 데이터 파싱
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

	// 사용자 정보 조회
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

	body, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return c.String(http.StatusBadRequest, "요청 본문을 읽는데 실패했습니다")
	}

	// 요청 본문 파싱
	var requestData struct {
		Option int `json:"option"`
	}
	err = json.Unmarshal(body, &requestData)
	if err != nil {
		fmt.Printf("수신된 데이터 (원본): %s\n", string(body))
		return c.String(http.StatusOK, "비 JSON 데이터 수신됨")
	}

	// 결제 요청 생성
	kakaoClient := payment.NewKakaoPayClient()
	partnerPayOrderID := fmt.Sprintf("pay-order-%s-%d", user.Email, time.Now().Unix())
	kakaoPayRequest := models.KakaoPayRequest{
		Cid:            kakaoClient.Cid,
		PartnerOrderId: partnerPayOrderID,
		PartnerUserId:  user.ID,
		ItemName:       fmt.Sprintf("%d", requestData.Option),
		Quantity:       1,
		TotalAmount:    requestData.Option,
		TaxFreeAmount:  requestData.Option,
		ApprovalUrl:    fmt.Sprintf("%s/kakaopay/success?pay_order=%s", config.ClientURL(), partnerPayOrderID),
		CancelUrl:      fmt.Sprintf("%s/kakaopay/cancel?pay_order=%s", config.ClientURL(), partnerPayOrderID),
		FailUrl:        fmt.Sprintf("%s/kakaopay/fail?pay_order=%s", config.ClientURL(), partnerPayOrderID),
	}

	response, err := kakaoClient.RequestPayment(kakaoPayRequest)
	if err != nil {
		log.Printf("카카오페이 결제 요청 실패")
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "카카오페이 결제 요청에 실패하였습니다."})
	}

	responseData := map[string]string{
		"redirect_url": response.NextRedirectPcUrl,
	}

	// 결제 정보 저장
	payOrder := models.PayOrder{
		PayOrderID: partnerPayOrderID,
		UserID:     objectID,
		Amount:     requestData.Option,
		Tid:        response.Tid,
		Status:     "결제 대기",
		CreatedAt:  time.Now(),
		ExpiresAt:  time.Now().Add(30 * time.Minute),
	}

	result, err := client.Database(dbName).Collection("payments").InsertOne(context.Background(), payOrder)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "결제 정보를 DB에 저장하는데 실패하였습니다."})
	}

	// 사용자 스키마에 결제 내역 추가
	payOrderID := result.InsertedID.(primitive.ObjectID)
	_, err = client.Database(dbName).Collection("users").UpdateOne(context.Background(), bson.M{"_id": objectID}, bson.M{"$push": bson.M{"payments": payOrderID}})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "사용자 정보 업데이트에 실패하였습니다."})
	}

	// 로그 및 응답
	fmt.Printf("수신된 데이터 (JSON): %+v\n", responseData)
	return c.JSON(http.StatusOK, responseData)
}


// PayApproveHandler는 카카오페이 결제 승인 요청을 처리하는 함수
func PayApproveHandler(c echo.Context, client *mongo.Client) error {
	dbName := config.DBName()

	var requestBody struct {
		PgToken string `json:"pg_token"`
		PartnerPayOrderID string `json:"pay_order"`
	}

	if err := c.Bind(&requestBody); err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청 형식입니다."})
	}

	pgToken := requestBody.PgToken
	PartnerPayOrderID := requestBody.PartnerPayOrderID

	log.Printf("클라이언트에서 가져온 값, %s %s", pgToken, PartnerPayOrderID)

	if PartnerPayOrderID == "" || pgToken == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "필수 파라미터가 누락되었습니다"})
	}

	mongoSession, err := client.StartSession()
	if err != nil {
		log.Printf("MongoDB 세션 생성 실패: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "세션 생성에 실패하였습니다"})
	}
	defer mongoSession.EndSession(context.Background())

	callback := func(sessCtx mongo.SessionContext) (interface{}, error) {
		var payOrder models.PayOrder
		err = client.Database(dbName).Collection("payments").FindOne(sessCtx, bson.M{"pay_order_id": PartnerPayOrderID}).Decode(&payOrder)
		if err != nil {
			log.Printf("주문 조회 실패: %v", err)
			return nil, fmt.Errorf("주문 조회 실패: %v", err)
		}

		kakaoClient := payment.NewKakaoPayClient()
		approveResponse, err := kakaoClient.ApprovePayment(pgToken, payOrder.Tid, payOrder.PayOrderID, payOrder.UserID.Hex())
		if err != nil {
			log.Printf("카카오페이 승인 실패: %v", err)
			return nil, fmt.Errorf("카카오페이 승인 실패: %v", err)
		}

		result, err := client.Database(dbName).Collection("payments").UpdateOne(sessCtx, bson.M{"pay_order_id": PartnerPayOrderID, "status": "결제 대기"}, bson.M{"$set": bson.M{"status": "결제 완료"}})
		if err != nil || result.ModifiedCount == 0 {
			log.Printf("주문 상태 업데이트 실패: %v", err)
			return nil, fmt.Errorf("주문 상태 업데이트 실패: 이미 처리된 주문이거나 오류 발생")
		}

		var user models.User
		err = client.Database(dbName).Collection("users").FindOne(sessCtx, bson.M{"_id": payOrder.UserID}).Decode(&user)
		if err != nil {
			log.Printf("사용자 조회 실패: %v", err)
			return nil, fmt.Errorf("사용자 조회 실패: %v", err)
		}

		updatedBalance := user.Balance + payOrder.Amount
		_, err = client.Database(dbName).Collection("users").UpdateOne(sessCtx, bson.M{"_id": payOrder.UserID}, bson.M{"$set": bson.M{"balance": updatedBalance}})
		if err != nil {
			log.Printf("사용자 잔액 업데이트에 실패하였습니다.")
			return nil, fmt.Errorf("사용자 잔액 업데이트에 실패하였습니다")
		}

		log.Printf("사용자 금액 업데이트 성공: 사용자 ID = %s, 새로운 잔액 = %d", payOrder.UserID.Hex(), updatedBalance)

		return approveResponse, nil
	}

	result, err := mongoSession.WithTransaction(context.Background(), callback, options.Transaction())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("트랜잭션 실패: %v", err)})
	}

	return c.JSON(http.StatusOK, result)
}

/*
controllers 패키지는 HTTP 요청을 처리하는 핸들러 함수를 포함한다.
PayHandler는 /pay 경로에 대한 요청을 처리한다.
*/

package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"payment-server/internal/entity"
	usecase "payment-server/internal/usecase/kakaopay"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// PaymentHandler는 결제 관련 요청을 처리하는 핸들러입니다.
type PaymentHandler struct {
	PaymentUsecase *usecase.PaymentUsecase
}

// NewPaymentHandler는 PaymentHandler를 생성한다.
func NewPaymentHandler(u *usecase.PaymentUsecase) *PaymentHandler{
	return &PaymentHandler{PaymentUsecase: u}
}

// CreatePayment는 /pay 경로에 대한 결제 요청을 처리합니다.
func (h *PaymentHandler) CreatePayment(c echo.Context) error {
	// 세션 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {
		log.Printf("세션 쿠키를 찾을 수 없음")
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"사용자 정보를 찾을 수 없습니다."})
	}

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
	actualSessionID := strings.Split(parts[1], ".")[0]

	// 사용자 정보 조회
	userID := actualSessionID
	objectID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		log.Printf("유효하지 않은 사용자 %v", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "유효하지 않은 사용자 ID입니다."})
	}

	var req struct {
		Option int `json:"option"`
	}

	if err := c.Bind(&req); err != nil {
		log.Printf("요청 형식이 잘못됨 %v", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error":"요청 형식이 잘못되었습니다."})
	}

	// 결제 요청 생성
	partnerPayOrderID := fmt.Sprintf("pay-order-%s-%d", userID, time.Now().Unix())
	
	payOrder := entity.PayOrder{
		PayOrderID: partnerPayOrderID,
		UserID:     objectID,
		Amount:     req.Option,
		Status:     "결제 대기",
		CreatedAt:  time.Now(),
		ExpiresAt:  time.Now().Add(30 * time.Minute),
	}

	kakaoPayRequest := entity.KakaoPayRequest{
		Cid:            h.PaymentUsecase.KakaoPayService.Cid,
		PartnerOrderId: partnerPayOrderID,
		PartnerUserId:  userID,
		ItemName:       fmt.Sprintf("%d", req.Option),
		Quantity:       1,
		TotalAmount:    req.Option,
		TaxFreeAmount:  req.Option,
		ApprovalUrl:    fmt.Sprintf("%s/kakaopay/success?pay_order=%s", "https://clienturl.com", partnerPayOrderID),
		CancelUrl:      fmt.Sprintf("%s/kakaopay/cancel?pay_order=%s", "https://clienturl.com", partnerPayOrderID),
		FailUrl:        fmt.Sprintf("%s/kakaopay/fail?pay_order=%s", "https://clienturl.com", partnerPayOrderID),
	}

	// 결제 요청 및 결제 결제 내역 저장
	response, err := h.PaymentUsecase.CreatePayOrder(context.Background(), payOrder, kakaoPayRequest)
	if err != nil {
		log.Printf("결제 요청 실패 %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "결제 요청 생성에 실패했습니다."})
	}

	// 사용자 스키마에 결제내역 추가
	if err := h.PaymentUsecase.UpdateUserPayments(context.Background(), objectID, payOrder.PayOrderID); err != nil{
		log.Printf("사용자 정보 업데이트 성공 %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "사용자 정보 업데이트에 성공하였습니다."})
	}

	return c.JSON(http.StatusOK, response)
}

// // PayApproveHandler는 카카오페이 결제 승인 요청을 처리하는 함수
// func PayApproveHandler(c echo.Context, client *mongo.Client) error {
// 	dbName := config.DBName()

// 	var requestBody struct {
// 		PgToken           string `json:"pg_token"`
// 		PartnerPayOrderID string `json:"pay_order"`
// 	}

// 	if err := c.Bind(&requestBody); err != nil {

// 		return c.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청 형식입니다."})
// 	}

// 	pgToken := requestBody.PgToken
// 	PartnerPayOrderID := requestBody.PartnerPayOrderID

// 	log.Printf("클라이언트에서 가져온 값, %s %s", pgToken, PartnerPayOrderID)

// 	if PartnerPayOrderID == "" || pgToken == "" {
// 		return c.JSON(http.StatusBadRequest, map[string]string{"error": "필수 파라미터가 누락되었습니다"})
// 	}

// 	mongoSession, err := client.StartSession()
// 	if err != nil {
// 		log.Printf("MongoDB 세션 생성 실패: %v", err)
// 		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "세션 생성에 실패하였습니다"})
// 	}
// 	defer mongoSession.EndSession(context.Background())

// 	callback := func(sessCtx mongo.SessionContext) (interface{}, error) {
// 		var payOrder models.PayOrder
// 		err = client.Database(dbName).Collection("payments").FindOne(sessCtx, bson.M{"pay_order_id": PartnerPayOrderID}).Decode(&payOrder)
// 		if err != nil {
// 			log.Printf("주문 조회 실패: %v", err)
// 			return nil, fmt.Errorf("주문 조회 실패: %v", err)
// 		}

// 		kakaoClient := payment.NewKakaoPayClient()
// 		approveResponse, err := kakaoClient.ApprovePayment(pgToken, payOrder.Tid, payOrder.PayOrderID, payOrder.UserID.Hex())
// 		if err != nil {
// 			log.Printf("카카오페이 승인 실패: %v", err)
// 			return nil, fmt.Errorf("카카오페이 승인 실패: %v", err)
// 		}

// 		result, err := client.Database(dbName).Collection("payments").UpdateOne(sessCtx, bson.M{"pay_order_id": PartnerPayOrderID, "status": "결제 대기"}, bson.M{"$set": bson.M{"status": "결제 완료"}})
// 		if err != nil || result.ModifiedCount == 0 {
// 			log.Printf("주문 상태 업데이트 실패: %v", err)
// 			return nil, fmt.Errorf("주문 상태 업데이트 실패: 이미 처리된 주문이거나 오류 발생")
// 		}

// 		var user models.User
// 		err = client.Database(dbName).Collection("users").FindOne(sessCtx, bson.M{"_id": payOrder.UserID}).Decode(&user)
// 		if err != nil {
// 			log.Printf("사용자 조회 실패: %v", err)
// 			return nil, fmt.Errorf("사용자 조회 실패: %v", err)
// 		}

// 		updatedBalance := user.Balance + payOrder.Amount
// 		_, err = client.Database(dbName).Collection("users").UpdateOne(sessCtx, bson.M{"_id": payOrder.UserID}, bson.M{"$set": bson.M{"balance": updatedBalance}})
// 		if err != nil {
// 			log.Printf("사용자 잔액 업데이트에 실패하였습니다.")
// 			return nil, fmt.Errorf("사용자 잔액 업데이트에 실패하였습니다")
// 		}

// 		log.Printf("사용자 금액 업데이트 성공: 사용자 ID = %s, 새로운 잔액 = %d", payOrder.UserID.Hex(), updatedBalance)

// 		return approveResponse, nil
// 	}

// 	result, err := mongoSession.WithTransaction(context.Background(), callback, options.Transaction())
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("트랜잭션 실패: %v", err)})
// 	}

// 	return c.JSON(http.StatusOK, result)
// }

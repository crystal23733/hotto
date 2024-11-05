/*
controllers 패키지는 HTTP 요청을 처리하는 핸들러 함수를 포함한다.
PayHandler는 /pay 경로에 대한 요청을 처리한다.
*/

package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"payment-server/internal/config"
	"payment-server/internal/entity"
	usecase "payment-server/internal/usecase/kakaopay"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// PaymentHandler는 결제 관련 요청을 처리하는 핸들러입니다.
type PaymentHandler struct {
	PaymentUsecase *usecase.PaymentUsecase
}

// NewPaymentHandler는 PaymentHandler를 생성한다.
func NewPaymentHandler(u *usecase.PaymentUsecase) *PaymentHandler {
	return &PaymentHandler{PaymentUsecase: u}
}

// CreatePayment는 /pay 경로에 대한 결제 요청을 처리합니다.
func (h *PaymentHandler) CreatePayment(c echo.Context) error {
	// 세션 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "사용자 정보를 찾을 수 없습니다."})
	}

	decodedSessionID, err := url.QueryUnescape(sessionID.Value)

	if err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션을 디코딩하는데 실패하였습니다."})
	}

	// 세션 ID에서 실제 세션 ID 추출
	parts := strings.Split(decodedSessionID, ":")
	if len(parts) < 2 {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID 형식이 잘못되었습니다."})
	}
	actualSessionID := strings.Split(parts[1], ".")[0]

	// Session 구조체 정의
	var sessionDoc struct {
		Session string `bson:"session"`
	}

	// 세션 정보 조회
	err = h.PaymentUsecase.SessionRepo.SessionFind(context.Background(), actualSessionID, &sessionDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {

			return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
		}

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
	}

	// 세션 데이터 파싱
	var sessionData struct {
		UserID string `json:"userId"`
	}
	err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 파싱하는데 실패하였습니다."})
	}

	var user entity.User
	objectID, err := primitive.ObjectIDFromHex(sessionData.UserID)

	if err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "유효하지 않은 ID입니다."})
	}

	err = h.PaymentUsecase.UserRepo.UserFind(context.Background(), objectID, &user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "사용자를 찾을 수 없습니다."})
		}

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생했습니다."})
	}

	var req struct {
		Option int `json:"option"`
	}

	if err := c.Bind(&req); err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "요청 형식이 잘못되었습니다."})
	}

	// 결제 요청 생성
	partnerPayOrderID := fmt.Sprintf("pay-order-%s-%d", user.Email, time.Now().Unix())

	payOrder := entity.PayOrder{
		PayOrderID: partnerPayOrderID,
		UserID:     objectID,
		Amount:     req.Option,
		Status:     "결제 대기",
		CreatedAt:  time.Now(),
		ExpiresAt:  time.Now().Add(30 * time.Minute),
		Pay: "KakaoPay",
	}

	kakaoPayRequest := entity.KakaoPayRequest{
		Cid:            h.PaymentUsecase.KakaoPayService.Cid,
		PartnerOrderId: partnerPayOrderID,
		PartnerUserId:  user.ID,
		ItemName:       fmt.Sprintf("%d", req.Option),
		Quantity:       1,
		TotalAmount:    req.Option,
		TaxFreeAmount:  req.Option,
		ApprovalUrl:    fmt.Sprintf("%s/kakaopay/success?pay_order=%s", config.ClientURL(), partnerPayOrderID),
		CancelUrl:      fmt.Sprintf("%s/kakaopay/cancel?pay_order=%s", config.ClientURL(), partnerPayOrderID),
		FailUrl:        fmt.Sprintf("%s/kakaopay/fail?pay_order=%s", config.ClientURL(), partnerPayOrderID),
	}

	// 결제 요청
	response, paymentID, err := h.PaymentUsecase.CreatePayOrder(context.Background(), payOrder, kakaoPayRequest)
	if err != nil {

		if strings.Contains(err.Error(), "400 Bad Request") {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "결제 요청 형식이 올바르지 않습니다"})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "결제 요청 처리 중 오류가 발생했습니다"})
	}

	// 사용자 스키마에 결제내역 추가
	if err := h.PaymentUsecase.UserRepo.UpdateUserPayments(context.Background(), objectID, paymentID); err != nil {

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "사용자 정보 업데이트에 성공하였습니다."})
	}

	responseData := map[string]string{
		"redirect_url": response.NextRedirectPcUrl,
	}

	fmt.Printf("수신된 데이터 (JSON): %+v\n", responseData)
	return c.JSON(http.StatusOK, responseData)
}

// PayApproveHandler는 카카오페이 결제 승인 요청을 처리하는 함수.
func (h *PaymentHandler) PayApproveHandler(c echo.Context) error {
	var requestBody struct {
		PgToken           string `json:"pg_token"`
		PartnerPayOrderID string `json:"pay_order"`
	}

	if err := c.Bind(&requestBody); err != nil {

		return c.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청 형식입니다."})
	}

	pgToken := requestBody.PgToken
	partnerPayOrderID := requestBody.PartnerPayOrderID

	if partnerPayOrderID == "" || pgToken == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "필수 파라미터가 누락되었습니다"})
	}

	// 유즈케이스 호출
	approveResponse, err := h.PaymentUsecase.ApprovePayOrder(context.Background(), pgToken, partnerPayOrderID)
	if err != nil {

		return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("결제 승인 실패: %v", err)})
	}

	return c.JSON(http.StatusOK, approveResponse)
}

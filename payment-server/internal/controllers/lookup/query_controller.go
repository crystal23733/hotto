package controller

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	usecase "payment-server/internal/usecase/lookup"
	"strings"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// PaymentQueryHandler는 결제 내역 조회를 처리하는 핸들러이다.
type PaymentQueryHandler struct {
	PaymentQueryUsecase *usecase.PaymentQueryUsecase
}

// NewPaymentQueryHandler는 PaymentQueryHandler를 생성한다.
func NewPaymentQueryHandler(u *usecase.PaymentQueryUsecase) *PaymentQueryHandler {
	return &PaymentQueryHandler{PaymentQueryUsecase: u}
}

// GetPayments는 사용자 결제 내역을 조회하는 핸들러이다.
func (h *PaymentQueryHandler) GetPayments(c echo.Context) error {
	// 세션 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "사용자 정보를 찾을 수 없습니다.."})
	}

	decodedSessionID, err := url.QueryUnescape(sessionID.Value)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션을 디코딩하는데 실패하였습니다."})
	}

	// 세션 ID에서 실제 세션 추출
	parts := strings.Split(decodedSessionID, ":")
	if len(parts) < 2 {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "세션 ID형식이 잘못되었습니다."})
	}
	actualSessionID := strings.Split(parts[1], ".")[0]

	// Session 구조체 정의
	var sessionDoc struct {
		Session string `bson:"session"`
	}
	// 세션 정보 조회
	err = h.PaymentQueryUsecase.SessionRepo.SessionFind(context.Background(), actualSessionID, &sessionDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "세션을 찾을 수 없습니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터베이스 오류가 발생하였습니다."})
	}

	// 세션 데이터 파싱
	var sessionData struct {
		UserID string `json:"userId"`
	}
	err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "데이터를 파싱하는데 실패하였습니다."})
	}

	// 사용자 ID를 기반으로 결제 내역 조회
	userID, err := primitive.ObjectIDFromHex(sessionData.UserID)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "유효하지 않은 사용자 ID입니다."})
	}

	payments, err := h.PaymentQueryUsecase.GetUserPayments(context.Background(), userID)
	if err != nil {
		if err.Error() == "결제 내역을 찾을 수 없습니다" {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "결제 내역을 찾을 수 없습니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "결제 내역 조회에 실패하였습니다."})
	}

	return c.JSON(http.StatusOK, payments)
}

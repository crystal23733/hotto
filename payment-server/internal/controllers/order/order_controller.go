package controllers

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"payment-server/internal/entity"
	usecase "payment-server/internal/usecase/order"
	"strings"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/mongo"
)

// OrderController 구조체
type OrderController struct {
	OrderUsecase usecase.OrderUsecase
}

func NewOrderController(orderUsecase *usecase.OrderUsecase) *OrderController {
	return &OrderController{
		OrderUsecase: *orderUsecase,
	}
}

func (h *OrderController) OrderHandler(c echo.Context) error {
	payOrderID := c.Param("pay_order_id")
	if payOrderID == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "주문 번호가 필요합니다."})
	}

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
	err = h.OrderUsecase.SessionRepo.SessionFind(context.Background(), actualSessionID, &sessionDoc)
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

	var req entity.ProdctOrderRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청입니다:" + err.Error()})
	}

	lottoNumbers, err := h.OrderUsecase.CreateProductOrder(context.Background(), sessionData.UserID, &req)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]interface{}{
			"success": false,
			"message": err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]interface{}{
		"success":      true,
		"message":      "결제가 성공적으로 완료되었습니다.",
		"lottoNumbers": lottoNumbers,
	})
}

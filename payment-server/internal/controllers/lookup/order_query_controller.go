package controller

import (
	"context"
	"net/http"
	"payment-server/internal/helpers"
	usecase "payment-server/internal/usecase/lookup"

	"github.com/labstack/echo/v4"
)

// OrderQueryHandler는 결제 내역 조회를 처리하는 핸들러이다.
type OrderQueryHandler struct {
	OrderQueryUsecase *usecase.OrderQueryUsecase
	SessionHelper     *helpers.SessionHelper
}

// NewOrdersQueryHandler는 OrdersQueryHandler를 생성한다.
func NewOrdersQueryHandler(u *usecase.OrderQueryUsecase, sh *helpers.SessionHelper) *OrderQueryHandler {
	return &OrderQueryHandler{OrderQueryUsecase: u, SessionHelper: sh}
}

// GetOrderss는 사용자 결제 내역을 조회하는 핸들러이다.
func (h *OrderQueryHandler) GetOrders(c echo.Context) error {
	userID, err := h.SessionHelper.ExtractUserIDFromSession(c)
	if err != nil {
		return err
	}

	orders, err := h.OrderQueryUsecase.GetUserOrder(context.Background(), userID)
	if err != nil {
		if err.Error() == "결제 내역을 찾을 수 없습니다" {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "결제 내역을 찾을 수 없습니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "결제 내역 조회에 실패하였습니다."})
	}

	return c.JSON(http.StatusOK, orders)
}

package usecase

import (
	"context"
	"fmt"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// OrderQueryUsecase는 주문내역을 처리하는 유즈케이스이다.
type OrderQueryUsecase struct {
	OrderRepo   *mongodb.OrderRepository
	UserRepo    *mongodb.UserRepository
	SessionRepo *mongodb.SessionRepository
}

// NewOrderQueryUsecase는 OrderQueryUsecase를 생성한다.
func NewOrderQueryUsecase(orderRepo *mongodb.OrderRepository, userRepo *mongodb.UserRepository, sessionRepo *mongodb.SessionRepository) *OrderQueryUsecase {
	return &OrderQueryUsecase{
		OrderRepo:   orderRepo,
		UserRepo:    userRepo,
		SessionRepo: sessionRepo,
	}
}

// GetUserOrder는 사용자 ID를 기반으로 주문 정보를 조회하는 유즈케이스이다.
func (u *OrderQueryUsecase) GetUserOrder(ctx context.Context, userID primitive.ObjectID) ([]entity.ProductOrderResponse, error) {
	var user entity.User
	// 사용자 조회
	err := u.UserRepo.UserFind(ctx, userID, &user)
	if err != nil {
		return nil, fmt.Errorf("사용자 조회 실패: %v", err)
	}

	// 결제 내역 조회
	orderIDs := user.Orders
	var orders []entity.ProductOrderResponse
	for _, orderID := range orderIDs {
		var order entity.ProductOrder
		err := u.OrderRepo.FindOrderByObjectID(ctx, orderID, &order)
		if err != nil {
			continue // 조회 실패 시 계속 진행
		}

		// created_at을 KST로 변환
		kst, _ := time.LoadLocation("Asia/Seoul")
		createdAtKST := order.CreatedAt.In(kst)

		// 필요한 형식으로 변환 (예: "YYYY-MM-DD HH:mm")
		createdAtFormatted := createdAtKST.Format("2006년 1월 2일 15:04")
		createdAtDate := createdAtKST.Format("2006-01-02")

		// 필요한 필드만 담은 ProductOrderResponse 생성
		productOrderResponse := entity.ProductOrderResponse{
			PayOrderID:    order.PayOrderID,
			Amount:        order.Amount,
			Status:        order.Status,
			CreatedAt:     createdAtFormatted,
			CreatedAtDate: createdAtDate,
			LottoNumbers:  order.LottoNumbers,
		}

		orders = append(orders, productOrderResponse)
	}

	if len(orders) == 0 {
		return nil, fmt.Errorf("결제 내역을 찾을 수 없습니다")
	}

	return orders, nil
}

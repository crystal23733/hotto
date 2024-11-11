package usecase

import (
	"context"
	"fmt"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// PaymentQueryUsecase는 결제 내역 조회와 같은 공통적인 기능을 처리하는 유즈케이스이다.
type PaymentQueryUsecase struct {
	PaymentRepo *mongodb.PaymentRepository
	UserRepo    *mongodb.UserRepository
	SessionRepo *mongodb.SessionRepository
}

// NewPaymentQueryUsecase는 PaymentQueryUsecase를 생성한다,
func NewPaymentQueryUsecase(PaymentRepo *mongodb.PaymentRepository, UserRepo *mongodb.UserRepository, SessionRepo *mongodb.SessionRepository) *PaymentQueryUsecase {
	return &PaymentQueryUsecase{PaymentRepo: PaymentRepo, UserRepo: UserRepo, SessionRepo: SessionRepo}
}

// GetUserPayments는 사용자 ID를 기반으로 결제 정보를 조회하는 유즈케이스이다.
func (u *PaymentQueryUsecase) GetUserPayments(ctx context.Context, userID primitive.ObjectID) ([]entity.PayOrderResponse, error) {
	var user entity.User
	// 사용자 조회
	err := u.UserRepo.UserFind(ctx, userID, &user)
	if err != nil {
		return nil, fmt.Errorf("사용자 조회 실패: %v", err)
	}

	// 결제 내역 조회
	paymentIDs := user.Payments
	var payments []entity.PayOrderResponse
	for _, paymentID := range paymentIDs {
		var payOrder entity.PayOrder
		err := u.PaymentRepo.FindPayOrderByObjectID(ctx, paymentID, &payOrder)
		if err != nil {
			continue // 조회 실패 시 계속 진행
		}

		// created_at을 KST로 변환
		kst, _ := time.LoadLocation("Asia/Seoul")
		createdAtKST := payOrder.CreatedAt.In(kst)

		// 필요한 형식으로 변환 (예: "YYYY-MM-DD HH:mm")
		createdAtFormatted := createdAtKST.Format("2006년 1월 2일 15:04")
		createdAtDate := createdAtKST.Format("2006-01-02")

		// 필요한 필드만 담은 PayOrderResponse 생성
		payOrderResponse := entity.PayOrderResponse{
			PayOrderID:    payOrder.PayOrderID,
			Amount:        payOrder.Amount,
			Status:        payOrder.Status,
			CreatedAt:     createdAtFormatted,
			CreatedAtDate: createdAtDate,
			Pay:           payOrder.Pay,
		}

		payments = append(payments, payOrderResponse)
	}

	if len(payments) == 0 {
		return nil, fmt.Errorf("결제 내역을 찾을 수 없습니다")
	}

	return payments, nil
}

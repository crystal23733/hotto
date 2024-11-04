package usecase

import (
	"context"
	"fmt"
	"log"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"

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
func (u *PaymentQueryUsecase) GetUserPayments(ctx context.Context, userID primitive.ObjectID) ([]entity.PayOrder, error) {
	var user entity.User
	// 사용자 조회
	err := u.UserRepo.UserFind(ctx, userID, &user)
	if err != nil {
		log.Printf("사용자 조회 실패:%v", err)
		return nil, fmt.Errorf("사용자 조회 실패: %v", err)
	}

	// 결제 내역 조회
	paymentIDs := user.Payments
	var payments []entity.PayOrder
	for _, paymentID := range paymentIDs {
		var payOrder entity.PayOrder
		err := u.PaymentRepo.FindPayOrderByObjectID(ctx, paymentID, &payOrder)
		if err != nil {
			log.Printf("결제 내역 조회 실패 (결제 ID: %v): %v", paymentID.Hex(), err)
			continue // 조회 실패 시 계속 진행
		}
		payments = append(payments, payOrder)
	}

	if len(payments) == 0 {
		return nil, fmt.Errorf("결제 내역을 찾을 수 없습니다")
	}

	return payments, nil
}

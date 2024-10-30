package kakaopay

import (
	"context"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/services/kakaopay"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// PaymentUsecase는 결제 관련 비즈니스 로직을 처리하는 유즈케이스이다.
type PaymentUsecase struct{
	PaymentRepo *mongodb.PaymentRepository
	UserRepo *mongodb.UserRepository
	KakaoPayService *kakaopay.KakaoPayService
}

// NewPaymentUsecase는 PaymentUsecase를 생성한다.
func NewPaymentUsecase(repo *mongodb.PaymentRepository, kakaoService *kakaopay.KakaoPayService) *PaymentUsecase{
	return &PaymentUsecase{PaymentRepo: repo, KakaoPayService: kakaoService}
}

// CreatePayOrder는 결제 요청을 생성하는 유즈케이스이다.
func (u *PaymentUsecase) CreatePayOrder(ctx context.Context, order entity.PayOrder, request entity.KakaoPayRequest) (*entity.KakaoPayResponse, error) {
	response, err := u.KakaoPayService.RequestPayment(request)
	if err != nil {
		return nil, err
	}

	// 결제 요청을 저장합니다.
	if err := u.PaymentRepo.CreatePayOrder(ctx, order); err != nil {
		return nil, err
	}

	return response, nil
}

// UpdateUserPayments는 사용자 스키마에 결제 내역을 추가한다.
func (u *PaymentUsecase) UpdateUserPayments(ctx context.Context, userID primitive.ObjectID, payOrderID string) error {
	return u.UserRepo.UpdateUserPayments(ctx, userID, payOrderID)
}
package kakaopay

import (
	"context"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/services/kakaopay"
)

// PaymentUsecase는 결제 관련 비즈니스 로직을 처리하는 유즈케이스이다.
type PaymentUsecase struct{
	PaymentRepo *mongodb.PaymentRepository
	KakaoPayService *kakaopay.KakaoPayService
}

// NewPaymentUsecase는 PaymentUsecase를 생성한다.
func NewPaymentUsecase(repo *mongodb.PaymentRepository, kakaoService *kakaopay.KakaoPayService) *PaymentUsecase{
	return &PaymentUsecase{PaymentRepo: repo, KakaoPayService: kakaoService}
}

// CreatePayOrder는 결제 요청을 생성하는 유즈케이스이다.
func (u *PaymentUsecase) CreatePayOrder(ctx context.Context, order entity.PayOrder) error {
	return u.PaymentRepo.CreatePayOrder(ctx, order)
}

// UpdatePayOrderStatus는 결제 상태를 업데이트하는 유즈케이스이다.
func (u *PaymentUsecase) UpdatePayOrderStatus(ctx context.Context, payOrderID string, status string) error{
	return u.PaymentRepo.UpdatePayOrderStatus(ctx, payOrderID, status)
}
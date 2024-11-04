package usecase

import (
	"context"
	"fmt"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	"payment-server/internal/services/kakaopay"

	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// PaymentUsecase는 결제 관련 비즈니스 로직을 처리하는 유즈케이스이다.
type PaymentUsecase struct {
	PaymentRepo     *mongodb.PaymentRepository
	UserRepo        *mongodb.UserRepository
	SessionRepo     *mongodb.SessionRepository
	KakaoPayService *kakaopay.KakaoPayService
}

// NewPaymentUsecase는 PaymentUsecase를 생성한다.
func NewPaymentUsecase(PaymentRepo *mongodb.PaymentRepository, UserRepo *mongodb.UserRepository, SessionRepo *mongodb.SessionRepository, kakaoService *kakaopay.KakaoPayService) *PaymentUsecase {
	return &PaymentUsecase{PaymentRepo: PaymentRepo, UserRepo: UserRepo, SessionRepo: SessionRepo, KakaoPayService: kakaoService}
}

// CreatePayOrder는 결제 요청을 생성하는 유즈케이스이다.
func (u *PaymentUsecase) CreatePayOrder(ctx context.Context, order entity.PayOrder, request entity.KakaoPayRequest) (*entity.KakaoPayResponse, primitive.ObjectID, error) {
	response, err := u.KakaoPayService.RequestPayment(request)
	if err != nil {
		return nil, primitive.NilObjectID, err
	}

	order.Tid = response.Tid

	// 결제 요청을 저장하고 ID를 받음
	paymentID, err := u.PaymentRepo.CreatePayOrder(ctx, order)
	if err != nil {
		return nil, primitive.NilObjectID, err
	}

	return response, paymentID, nil
}

// ApprovePayOrder는 결제 승인 관련 비즈니스 로직을 처리하는 유즈케이스.
func (u *PaymentUsecase) ApprovePayOrder(ctx context.Context, pgToken, partnerPayOrderID string) (*entity.KakaoPayApproveResponse, error) {
	session, err := u.PaymentRepo.Collection.Database().Client().StartSession()
	if err != nil {
		return nil, fmt.Errorf("세션 생성 실패: %v", err)
	}
	defer session.EndSession(ctx)

	result, err := session.WithTransaction(ctx, func(sessCtx mongo.SessionContext) (interface{}, error) {
		// 결제 내역 조회
		var payOrder entity.PayOrder
		err := u.PaymentRepo.FindPayOrder(sessCtx, partnerPayOrderID, &payOrder)
		if err != nil {
			return nil, fmt.Errorf("결제 내역 조회 실패: %v", err)
		}

		// 카카오페이 결제 승인 요청
		approveResponse, err := u.KakaoPayService.ApprovePayment(pgToken, payOrder.Tid, payOrder.PayOrderID, payOrder.UserID.Hex())
		if err != nil {
			return nil, fmt.Errorf("카카오페이 승인 실패: %v", err)
		}

		// 사용자 잔액 업데이트
		err = u.UserRepo.UpdateUserBalance(sessCtx, payOrder.UserID, payOrder.Amount)
		if err != nil {
			return nil, fmt.Errorf("사용자 잔액 업데이트 실패: %v", err)
		}

		// 결제 상태 업데이트 및 TTL 제거
		if err := u.PaymentRepo.UpdatePayOrder(sessCtx, partnerPayOrderID, "결제 완료", true); err != nil {
			return nil, fmt.Errorf("결제 상태 업데이트 실패: %v", err)
		}

		return approveResponse, nil
	})

	if err != nil {
		return nil, fmt.Errorf("트랜잭션 실패: %v", err)
	}

	return result.(*entity.KakaoPayApproveResponse), nil
}

// 
func (u *PaymentUsecase)FindPayOrder 

package usecase

import "payment-server/internal/repositories/mongodb"

// OrderUsecase는 상품 결제 관련 로직을 담당하는 유즈케이스이다.
type OrderUsecase struct {
	UserRepo    *mongodb.UserRepository
	SessionRepo *mongodb.SessionRepository
}

// NewOrderUsecase는 OrderUsecase를 초기화한다.
func NewOrderUsecase(userRepo *mongodb.UserRepository, sessionRepo *mongodb.SessionRepository) *OrderUsecase {
	return &OrderUsecase{
		UserRepo:    userRepo,
		SessionRepo: sessionRepo,
	}
}

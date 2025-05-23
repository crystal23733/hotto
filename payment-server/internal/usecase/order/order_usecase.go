package usecase

import (
	"context"
	"errors"
	"fmt"
	"log"
	"payment-server/internal/entity"
	"payment-server/internal/repositories/mongodb"
	usecase "payment-server/internal/usecase/lotto"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// 사용자 정의 오류 메시지
var ErrUserNotFound = errors.New("사용자를 찾을 수 없습니다")

// OrderUsecase는 상품 결제 관련 로직을 담당하는 유즈케이스이다.
type OrderUsecase struct {
	UserRepo     *mongodb.UserRepository
	SessionRepo  *mongodb.SessionRepository
	OrderRepo    *mongodb.OrderRepository
	LottoUsecase usecase.LottoUsecase
	Client       *mongo.Client
}

// NewOrderUsecase는 OrderUsecase를 초기화한다.
func NewOrderUsecase(userRepo *mongodb.UserRepository, sessionRepo *mongodb.SessionRepository, orderRepo *mongodb.OrderRepository, lottoUsecase usecase.LottoUsecase, client *mongo.Client) *OrderUsecase {
	return &OrderUsecase{
		UserRepo:     userRepo,
		SessionRepo:  sessionRepo,
		OrderRepo:    orderRepo,
		LottoUsecase: lottoUsecase,
		Client:       client,
	}
}

func (u *OrderUsecase) CreateProductOrder(ctx context.Context, userId string, request *entity.ProdctOrderRequest) ([]int, error) {
	// 트랜잭션 생성
	sess, err := u.Client.StartSession()
	if err != nil {
		return nil, fmt.Errorf("트랜잭션을 생성하지 못했습니다: %w", err)
	}
	defer sess.EndSession(ctx)

	var lottoNumbers []int

	err = mongo.WithSession(ctx, sess, func(sc mongo.SessionContext) error {
		var user entity.User
		objectID, err := primitive.ObjectIDFromHex(userId)
		if err != nil {
			return fmt.Errorf("유효하지 않은 ID입니다: %w", err)
		}

		// 사용자 조회
		err = u.UserRepo.UserFind(sc, objectID, &user)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				return fmt.Errorf("사용자를 찾을 수 없습니다: %w", ErrUserNotFound)
			}
			return fmt.Errorf("데이터 베이스 오류가 발생하였습니다: %w", err)
		}

		if user.Balance < request.Amount {
			log.Println("잔액이 부족합니다.")
			return errors.New("잔액이 부족합니다")
		}

		// 번호 생성
		lottoNumbers, err = u.LottoUsecase.GenerateUniqueNumbers()
		if err != nil {
			return fmt.Errorf("번호 조합에 실패하였습니다: %w", err)
		}

		// 주문 생성
		newOrder := &entity.ProductOrder{
			ID:           primitive.NewObjectID(),
			PayOrderID:   request.PayOrderID,
			UserID:       objectID,
			Amount:       request.Amount,
			Status:       "결제 완료",
			CreatedAt:    time.Now(),
			LottoNumbers: lottoNumbers,
		}

		if u.OrderRepo == nil {
			log.Println("OrderRepo가 초기화되지 않았습니다.")
			return errors.New("OrderRepo가 초기화되지 않았습니다")
		}

		err = u.OrderRepo.CreateOrder(sc, newOrder)
		if err != nil {
			return fmt.Errorf("주문 저장 중 오류가 발생했습니다: %w", err)
		}

		// 사용자 잔액 감소 및 주문내역 업데이트
		update := bson.M{
			"$inc":  bson.M{"balance": -request.Amount},
			"$push": bson.M{"orders": newOrder.ID},
		}
		_, err = u.UserRepo.Collection.UpdateOne(sc, bson.M{"_id": objectID}, update)
		if err != nil {
			return fmt.Errorf("사용자 잔액 업데이트 중 오류가 발생했습니다: %w", err)
		}

		return nil
	})

	if err != nil {
		return nil, fmt.Errorf("%w", err)
	}

	return lottoNumbers, nil
}

package mongodb

import (
	"context"
	"fmt"
	"log"
	"payment-server/internal/entity"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PaymentRepository는 결제 관련 데이터를 다루는 레포지토리
type PaymentRepository struct {
	Collection *mongo.Collection
}

// NewPaymentRepository는 결제 레포지토리를 생성한다.
func NewPaymentRepository(client *mongo.Client, dbName string) *PaymentRepository {
	collection := client.Database(dbName).Collection("payments")
	return &PaymentRepository{Collection: collection}
}

// CreatePayOrder는 결제 요청을 생성한다.
func (r *PaymentRepository) CreatePayOrder(ctx context.Context, order entity.PayOrder) (primitive.ObjectID, error) {
	result, err := r.Collection.InsertOne(ctx, order)
	if err != nil {
		return primitive.NilObjectID, err
	}
	return result.InsertedID.(primitive.ObjectID), nil
}

// CreateTTLIndex는 결제 내역 컬렉션에 TTL 인덱스를 설정한다.
func (r *PaymentRepository) CreateTTLIndex() {
	// TTL 인덱스 생성
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"expires_at": 1},
		Options: options.Index().SetExpireAfterSeconds(0),
	}

	// 인덱스 생성
	_, err := r.Collection.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {
		log.Fatalf("TTL 인덱스 설정에 실패하였습니다: %v", err)
	}

	log.Println("TTL 인덱스가 성공적으로 설정되었습니다.")
}

// UpdateUserBalance는 사용자의 잔액을 업데이트하는 함수입니다.
func (r *UserRepository) UpdateUserBalance(ctx context.Context, userID primitive.ObjectID, amount int) error {
	filter := bson.M{"_id": userID}
	update := bson.M{"$inc": bson.M{"balance": amount}}

	_, err := r.Collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return fmt.Errorf("사용자 잔액 업데이트 실패: %v", err)
	}

	return nil
}

// FindPayOrder는 특정 결제 내역을 조회하는 메서드입니다.
func (r *PaymentRepository) FindPayOrder(ctx context.Context, payOrderID string, payOrder *entity.PayOrder) error {
	filter := bson.M{"pay_order_id": payOrderID}
	err := r.Collection.FindOne(ctx, filter).Decode(payOrder)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("결제 내역을 찾을 수 없습니다: %v", err)
		}
		return fmt.Errorf("결제 내역 조회 실패: %v", err)
	}
	return nil
}

// UpdatePayOrder는 결제 상태를 업데이트하고 선택적으로 TTL 필드를 제거한다.
func (r *PaymentRepository) UpdatePayOrder(ctx context.Context, payOrderID string, status string, removeTTL bool) error {
	filter := bson.M{"pay_order_id": payOrderID}
	update := bson.M{"$set": bson.M{"status": status}}

	if removeTTL {
		update["$unset"] = bson.M{"expires_at": ""} // TTL 인덱스 필드를 제거한다.
	}

	_, err := r.Collection.UpdateOne(ctx, filter, update)
	if err != nil {
		return fmt.Errorf("결제 내역 업데이트 실패: %v", err)
	}
	return nil
}

// FindPayOrderByObjectID는 특정 결제 내역을 ObjectID로 조회하는 메서드이다.
func (r *PaymentRepository) FindPayOrderByObjectID(ctx context.Context, paymentID primitive.ObjectID, payOrder *entity.PayOrder) error {
	filter := bson.M{"_id": paymentID}
	err := r.Collection.FindOne(ctx, filter).Decode(payOrder)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("결제 내역을 찾을 수 없습니다: %v", err)
		}
		return fmt.Errorf("결제 내역 조회 실패: %v", err)
	}

	return nil
}

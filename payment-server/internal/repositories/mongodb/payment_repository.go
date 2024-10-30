package mongodb

import (
	"context"
	"log"
	"payment-server/internal/entity"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// PaymentRepository는 결제 관련 데이터를 다루는 레포지토리
type PaymentRepository struct {
	Collection *mongo.Collection
}

// NewPaymentRepository는 결제 레포지토리를 생성한다.
func NewPaymentRepository (client *mongo.Client, dbName string) *PaymentRepository {
	collection := client.Database(dbName).Collection("payment")
	return &PaymentRepository{Collection: collection}
}

// CreatePayOrder는 결제 요청을 생성한다.
func (r *PaymentRepository) CreatePayOrder(ctx context.Context, order entity.PayOrder) error {
	_, err := r.Collection.InsertOne(ctx, order)
	if err != nil {
		return err
	}
	return nil
}

// UpdatePayOrderStatus는 결제 상태를 업데이트한다.
func (r *PaymentRepository) UpdatePayOrderStatus(ctx context.Context, payOrderID string, status string) error{
	filter := bson.M{"pay_order_id": payOrderID}
	update := bson.M{"$set":bson.M{"status": status}}

	_, err := r.Collection.UpdateOne(ctx, filter, update)
	return err
}

// CreateTTLIndex는 결제 내역 컬렉션에 TTL 인덱스를 설정한다.
func (r *PaymentRepository) CreateTTLIndex() {
	// TTL 인덱스 생성
	indexModel := mongo.IndexModel{
		Keys: bson.M{"expires_at": 1},
		Options: options.Index().SetExpireAfterSeconds(0),
	}

	// 인덱스 생성
	_, err := r.Collection.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {
		log.Fatalf("TTL 인덱스 설정에 실패하였습니다: %v", err)
	}

	log.Println("TTL 인덱스가 성공적으로 설정되었습니다.")
}
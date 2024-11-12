package mongodb

import (
	"context"
	"fmt"
	"payment-server/internal/entity"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// OrderRepository는 상품 주문 관련 데이터를 다루는 레포지토리이다.
type OrderRepository struct {
	Collection *mongo.Collection
}

// NewOrderRepository OrderRepository 생성자 함수
func NewOrderRepository(client *mongo.Client, dbName string) *OrderRepository {
	collection := client.Database(dbName).Collection("orders")
	return &OrderRepository{Collection: collection}
}

// CreateOrder 상품 주문을 저장하는 함수
func (r *OrderRepository) CreateOrder(ctx context.Context, order *entity.ProductOrder) error {
	_, err := r.Collection.InsertOne(ctx, order)
	return err
}

// FindOrderByObjectID는 특정 주문 내역을 ObjectID로 조회하는 메서드이다.
func (r *OrderRepository) FindOrderByObjectID(ctx context.Context, orderID primitive.ObjectID, order *entity.ProductOrder) error {
	filter := bson.M{"_id": orderID}
	err := r.Collection.FindOne(ctx, filter).Decode(order)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return fmt.Errorf("주문 내역을 찾을 수 없습니다: %w", err)
		}
		return fmt.Errorf("주문내역 조회 실패: %w", err)
	}
	return nil
}

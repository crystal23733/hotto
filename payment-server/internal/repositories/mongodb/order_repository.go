package mongodb

import (
	"context"
	"payment-server/internal/entity"

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

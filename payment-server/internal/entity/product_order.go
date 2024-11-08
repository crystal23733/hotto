package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ProductOrder는 상품의 결제를 정의하는 구조체이다.
type ProductOrder struct {
	PayOrderID string             `json:"pay_order_id" bson:"pay_order_id"`
	UserID     primitive.ObjectID `json:"user_id" bson:"user_id"`
	Amount     int                `json:"amount" bson:"amount"`
	Status     string             `json:"status" bson:"status"`
	CreatedAt  time.Time          `json:"created_at" bson:"created_at"`
}

package entity

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ProductOrder는 상품의 결제를 정의하는 구조체이다.
type ProductOrder struct {
	PayOrderID   string             `json:"pay_order_id" bson:"pay_order_id"`
	UserID       primitive.ObjectID `json:"user_id" bson:"user_id"`
	Amount       int                `json:"amount" bson:"amount"`
	Status       string             `json:"status" bson:"status"`
	CreatedAt    time.Time          `json:"created_at" bson:"created_at"`
	LottoNumbers []int              `json:"lotto_numbers" bson:"lotto_numbers"`
}

// ProductOrderRequest는 클라이언트 측에서 요청한 데이터의 구조체이다.
type ProdctOrderRequest struct {
	PayOrderID string    `json:"pay_order_id"`
	Amount     int       `json:"amount"`
	CreatedAt  time.Time `json:"created_at"`
}

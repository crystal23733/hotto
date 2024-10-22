package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	OrderID string `json:"order_id" bson:"order_id"`
	UserID primitive.ObjectID `json:"user_id" bson:"user_id"`
	Amount    int                `json:"amount" bson:"amount"`
	Tid       string             `json:"tid" bson:"tid"`
	Status    string             `json:"status" bson:"status"`
	CreatedAt time.Time          `json:"created_at" bson:"created_at"`
}

package entity

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type PayOrder struct {
	PayOrderID string             `json:"pay_order_id" bson:"pay_order_id"`
	UserID     primitive.ObjectID `json:"user_id" bson:"user_id"`
	Amount     int                `json:"amount" bson:"amount"`
	Tid        string             `json:"tid" bson:"tid"`
	Status     string             `json:"status" bson:"status"`
	CreatedAt  time.Time          `json:"created_at" bson:"created_at"`
	ExpiresAt  time.Time          `bson:"expires_at"`
	Pay string 										`json:"pay" bson:"pay"`
}

// CreateTTLIndex는 결제 내역 컬렉션에 TTL 인덱스를 설정하는 함수입니다.
func CreateTTLIndex(client *mongo.Client, dbName string) {
	// 결제 내역 컬렉션 참조
	paymentCollection := client.Database(dbName).Collection("payments")

	// TTL 인덱스 생성
	indexModel := mongo.IndexModel{
		Keys:    bson.M{"expires_at": 1},                  // "expires_at" 필드에 대한 인덱스 생성
		Options: options.Index().SetExpireAfterSeconds(0), // 문서 만료 시간이 지나면 자동 삭제
	}

	// 인덱스 생성
	_, err := paymentCollection.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {
		log.Fatalf("TTL 인덱스 설정에 실패하였습니다: %v", err)
	}

	log.Println("TTL 인덱스가 성공적으로 설정되었습니다.")
}

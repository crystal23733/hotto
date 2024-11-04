package watchers

import (
	"context"
	"log"
	"payment-server/internal/config"
	"payment-server/internal/repositories/mongodb"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// WatchPaymentDeletions함수는 실시간으로 payments컬렉션의 업데이트를 확인한다.
func WatchPaymentDeletions(client *mongo.Client, userRepo *mongodb.UserRepository) {
	dbName := config.DBName()
	paymentCollection := client.Database(dbName).Collection("payments")

	// Change Stream설정
	opts := options.ChangeStream().SetFullDocument(options.UpdateLookup)
	pipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.D{{Key: "operationType", Value: "delete"}}}},
	}

	// Change Stream열기
	changeStream, err := paymentCollection.Watch(context.Background(), pipeline, opts)
	if err != nil {
		log.Fatalf("Change Stream 생성 실패: %v", err)
	}
	defer changeStream.Close(context.Background())

	// Change Stream 감지
	for changeStream.Next(context.Background()) {
		var event struct {
			DocumentKey struct {
				ID primitive.ObjectID `bson:"_id"`
			} `bson:"documentKey"`
		}
		if err := changeStream.Decode(&event); err != nil {
			log.Printf("Change Stream 데이터 디코딩 실패: %v", err)
			continue
		}

		deletedPaymentID := event.DocumentKey.ID

		// 삭제된 결제 ID를 사용자 컬렉션에서 제거
		filter := bson.M{"payments": deletedPaymentID}
		update := bson.M{"$pull": bson.M{"payments": deletedPaymentID}}
		_, err := userRepo.Collection.UpdateMany(context.Background(), filter, update)

		if err != nil {
			log.Printf("사용자 컬렉션 업데이트 실패 (결제 ID 제거): %v", err)
		} else {
			log.Printf("사용자 컬렉션에서 결제 ID 제거 성공: %v", deletedPaymentID.Hex())
		}

	}
	if err := changeStream.Err(); err != nil {
		log.Printf("Change Stream 에러: %v", err)
	}

}

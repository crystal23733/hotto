/*
db패키지는 MongoDB 연결 및 초기화 기능을 제공한다.
ConnectDB 함수를 이용하여 MongoDBClient를 생성하고 반환한다.
*/

package db

import (
	"log"
	"payment-server/config"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/net/context"
)

// ConnectDB 함수는 MongoDB에 연결하고 클라이언트를 반환한다.
func ConnectDB() (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	dbURL := config.DBURL()
	log.Println("DB 연결중...")

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(dbURL))
	if err != nil {
		log.Println("DB 연결에 실패하였습니다.")
		return nil, err
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Println("DB 연결이 확인되지 않습니다.")
		return nil, err
	}

	log.Println("DB에 성공적으로 연결하였습니다.")
	return client, nil
}

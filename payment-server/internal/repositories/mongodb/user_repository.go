package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// UserRepository는 사용자 관련 데이터를 다루는 레포지토리이다.
type UserRepository struct {
	Collection *mongo.Collection
}

func NewUserRepository(client *mongo.Client, dbName string) *UserRepository {
	collection := client.Database(dbName).Collection("users")
	return &UserRepository{Collection: collection}
}

// 세션 관련 레포지토리
func NewSessionRepository(client *mongo.Client, dbName string) *UserRepository {
	collection := client.Database(dbName).Collection("sessions")
	return &UserRepository{Collection: collection}
}

// UserFind함수는 사용자를 조회하는 함수이다.
func (r *UserRepository) UserFind(ctx context.Context, userID primitive.ObjectID, user interface{}) error {
	err := r.Collection.FindOne(ctx, bson.M{"_id": userID}).Decode(user)
	if err != nil {
		return err
	}
	return nil
}

// UpdateUserPayments는 사용자 스키마에 결제 내역을 추가한다.
func (r *UserRepository) UpdateUserPayments(ctx context.Context, userID primitive.ObjectID, payOrderID string) error {
	_, err := r.Collection.UpdateOne(ctx, bson.M{"_id": userID}, bson.M{"$push": bson.M{"payments": payOrderID}})
	return err
}

// SessionFind는 세션을 조회하는 함수이다.
func (r *UserRepository) SessionFind(ctx context.Context, sessionID string, sessionDoc interface{}) error {
	err := r.Collection.FindOne(ctx, bson.M{"_id": sessionID}).Decode(sessionDoc)
	if err != nil {
		return err
	}
	return nil
}

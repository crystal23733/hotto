package mongodb

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// SessionRepository는 사용자 관련 데이터를 다루는 레포지토리이다.
type SessionRepository struct {
	Collection *mongo.Collection
}

// 세션 관련 레포지토리
func NewSessionRepository(client *mongo.Client, dbName string) *SessionRepository {
	collection := client.Database(dbName).Collection("sessions")
	return &SessionRepository{Collection: collection}
}

// SessionFind는 세션을 조회하는 함수이다.
func (r *SessionRepository) SessionFind(ctx context.Context, sessionID string, sessionDoc *struct {
	Session string `bson:"session"`
}) error {
	err := r.Collection.FindOne(ctx, bson.M{"_id": sessionID}).Decode(sessionDoc)
	if err != nil {
		return err
	}
	return nil
}

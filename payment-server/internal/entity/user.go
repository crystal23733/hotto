/*
models 패키지는 데이터 구조체를 정의한다.
User 구조체는 사용자의 정의를 나타낸다.
*/

package entity

import "go.mongodb.org/mongo-driver/bson/primitive"

// User는 사용자의 정보를 나타내는 구조체이다.
type User struct {
	ID       string               `json:"_id" bson:"_id"`
	Name     string               `json:"name" bson:"name"`
	Email    string               `json:"email" bson:"email"`
	Balance  int                  `json:"balance" bson:"balance"`
	Payments []primitive.ObjectID `json:"payments" bson:"payments"`
	Orders   []primitive.M        `json:"orders" bson:"orders"`
}

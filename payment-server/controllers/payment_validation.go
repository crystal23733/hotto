package controllers

import (
	"context"
	"net/http"
	"payment-server/config"
	"time"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// TIDValidationRequest는 TID 검증 요청 구조체입니다.
type TIDValidationRequest struct {
	TID string `json:"tid"`
}

// ValidateTIDHandler는 TID의 유효성을 검증하는 핸들러입니다.
func ValidateTIDHandler(c echo.Context, client *mongo.Client) error {
	var req TIDValidationRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "잘못된 요청 형식입니다."})
	}

	// 데이터베이스에서 주문 조회
	dbName := config.DBName()
	collection := client.Database(dbName).Collection("orders")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// TID로 주문 검색
	var order struct {
		CreatedAt time.Time `bson:"createdAt"`
		Status    string    `bson:"status"`
	}

	err := collection.FindOne(ctx, bson.M{
		"tid": req.TID,
		"createdAt": bson.M{
			// 최근 30분 이내의 주문만 유효하다고 가정
			"$gt": time.Now().Add(-30 * time.Minute),
		},
		"status": "pending",
	}).Decode(&order)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.JSON(http.StatusNotFound, map[string]string{"error": "유효하지 않은 결제 정보입니다."})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "서버 오류가 발생했습니다."})
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "valid"})
}

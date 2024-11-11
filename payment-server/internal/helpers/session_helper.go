package helpers

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
	"payment-server/internal/repositories/mongodb"
	"strings"

	"github.com/labstack/echo/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// SessionHelper는 세션 관련 처리를 담당하는 구조체이다.
type SessionHelper struct {
	SessionRepo *mongodb.SessionRepository
}

// NewSessionHelper는 SessionHelper를 생성하는 함수이다.
func NewSessionHelper(sessionRepo *mongodb.SessionRepository) *SessionHelper {
	return &SessionHelper{
		SessionRepo: sessionRepo,
	}
}

// ExtractUserIDFromSession은 세션에서 사용자 ID를 추출하는 함수이다.
func (sh *SessionHelper) ExtractUserIDFromSession(c echo.Context) (primitive.ObjectID, error) {
	// 세션 가져오기
	sessionID, err := c.Cookie("LIN_HOTTO")
	if err != nil {
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusBadRequest, "사용자 정보를 찾을 수 없습니다.")
	}

	decodedSessionID, err := url.QueryUnescape(sessionID.Value)
	if err != nil {
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusBadRequest, "세션을 디코딩하는데 실패하였습니다.")
	}

	// 세션 ID에서 실제 세션 추출
	parts := strings.Split(decodedSessionID, ":")
	if len(parts) < 2 {
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusBadRequest, "세션 ID 형식이 잘못되었습니다.")
	}
	actualSessionID := strings.Split(parts[1], ".")[0]

	// Session 구조체 정의
	var sessionDoc struct {
		Session string `bson:"session"`
	}

	// 세션 정보 조회
	err = sh.SessionRepo.SessionFind(context.Background(), actualSessionID, &sessionDoc)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return primitive.NilObjectID, echo.NewHTTPError(http.StatusNotFound, "세션을 찾을 수 없습니다.")
		}
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusInternalServerError, "데이터베이스 오류가 발생하였습니다.")
	}

	// 세션 데이터 파싱
	var sessionData struct {
		UserID string `json:"userId"`
	}
	err = json.Unmarshal([]byte(sessionDoc.Session), &sessionData)
	if err != nil {
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusInternalServerError, "데이터를 파싱하는데 실패하였습니다.")
	}

	// 사용자 ID 변환
	userID, err := primitive.ObjectIDFromHex(sessionData.UserID)
	if err != nil {
		return primitive.NilObjectID, echo.NewHTTPError(http.StatusBadRequest, "유효하지 않은 사용자 ID입니다.")
	}

	return userID, nil
}

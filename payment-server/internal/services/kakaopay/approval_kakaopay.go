package kakaopay

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"payment-server/internal/entity"
)

// ApprovePayment는 카카오페이 결제 승인을 요청합니다.
func (s *KakaoPayService) ApprovePayment(pgToken, tid, orderId, userId string) (*entity.KakaoPayApproveResponse, error) {
	approveUrl := "https://open-api.kakaopay.com/online/v1/payment/approve"
	requestBody := map[string]string{
		"cid":              s.Cid,
		"tid":              tid,
		"partner_order_id": orderId,
		"partner_user_id":  userId,
		"pg_token":         pgToken,
	}

	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return nil, errors.New("결제 승인 요청 본문을 생성하는데에 실패했습니다")
	}

	req, err := http.NewRequest("POST", approveUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "SECRET_KEY "+s.CidSecret)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("카카오페이 API 호출 실패: %s, 응답 본문: %s", resp.Status, string(body))
	}

	var approveResponse entity.KakaoPayApproveResponse
	if err := json.NewDecoder(resp.Body).Decode(&approveResponse); err != nil {
		return nil, errors.New("카카오페이 응답을 파싱하는데 실패했습니다")
	}
	return &approveResponse, nil
}
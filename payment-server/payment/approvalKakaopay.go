package payment

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"payment-server/models"
)

// ApprovePayment는 카카오페이 결제 승인 요청을 보냅니다.
func (c *KakaoPayClient) ApprovePayment(pgToken, tid, orderId, userId string) (*models.KakaoPayApproveResponse, error) {
	approveUrl := "https://open-api.kakaopay.com/online/v1/payment/approve"
	requestBody := map[string]string{
		"cid":              c.Cid,
		"tid":              tid,
		"partner_order_id": orderId,
		"partner_user_id":  userId,
		"pg_token":         pgToken,
	}

	jsonBody, err := json.Marshal(requestBody)
	log.Printf("카카오페이 승인 요청 본문: %s", string(jsonBody))
	if err != nil {
		log.Printf("결제 승인 요청 본문을 생성하는데에 실패하였습니다")
		return nil, errors.New("결제 승인 요청 본문을 생성하는데에 실패하였습니다")
	}

	req, err := http.NewRequest("POST", approveUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "SECRET_KEY "+c.CidSecret)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		log.Printf("카카오페이 API 호출 실패: %s, 응답 본문: %s", resp.Status, string(body))
		return nil, fmt.Errorf("카카오페이 API 호출 실패: %s, 응답 본문: %s", resp.Status, string(body))
	}

	var approveResponse models.KakaoPayApproveResponse
	if err := json.NewDecoder(resp.Body).Decode(&approveResponse); err != nil {
		log.Printf("카카오페이 응답을 파싱하는데 실패하였습니다.")
		return nil, errors.New("카카오페이 응답을 파싱하는데 실패하였습니다.")
	}
	return &approveResponse, nil
}

/*
payment 패키지는 결제 게이트웨이와의 상호작용을 담당한다.
kakaopay.go는 KakaoPay 결제 요청을 처리하는 기능을 포함한다.
*/

package payment

import (
	"bytes"
	"encoding/json"
	"errors"
	"io"
	"log"
	"net/http"
	"payment-server/config"
	"payment-server/models"
)

// KakaoPayClient는 KakaoPay API와 상호작용하기 위한 클라이언트 구조체입니다.
type KakaoPayClient struct {
	APIEndpoint string
	Cid         string
	CidSecret   string
}

// KakaopayClient 인스턴스 생성 함수
func NewKakaoPayClient() *KakaoPayClient {
	return &KakaoPayClient{
		APIEndpoint: "https://open-api.kakaopay.com/online/v1/payment/ready",
		Cid:         config.Cid(),
		CidSecret:   config.CidSecret(),
	}
}

// RequestPayment는 카카오페이에 결제 요청을 보낸다.
func (c *KakaoPayClient) RequestPayment(request models.KakaoPayRequest) (*models.KakaoPayResponse, error) {
	// 요청 본문 생성
	requestBody, err := json.Marshal(request)
	if err != nil {
		return nil, errors.New("결제 요청 본문을 생성하는데에 실패하였습니다.")
	}
	
	log.Printf("카카오페이 요청본문: %s", string(requestBody))

	// 카카오페이 API에 요청 전송
	req, err := http.NewRequest("POST", c.APIEndpoint, bytes.NewBuffer(requestBody))
	if err != nil {
		log.Printf("API요청 실패:%v", err)
		return nil, err
	}

	// 헤더설정
	req.Header.Set("Authorization", "SECRET_KEY " + c.CidSecret)
	req.Header.Set("Content-Type", "application/json")
	log.Printf("카카오페이 요청사항: Method=%s, URL=%s, Headers=%v", req.Method, req.URL, req.Header)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("헤더 에러:%v", err)
		return nil, err
	}
	defer resp.Body.Close()

	// 응답처리
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body) // 응답 본문을 읽어들임
		log.Printf("API 호출 실패: %v, 응답 본문: %s", resp.Status, string(body))
		return nil, errors.New("카카오페이 API호출 실패: " + resp.Status)
	}

	var kakaoPayResponse models.KakaoPayResponse
	if err := json.NewDecoder(resp.Body).Decode(&kakaoPayResponse); err != nil {
		log.Printf("API응답 파싱 실패:%v", err)
		return nil, errors.New("카카오페이 응답을 파싱하는데에 실패하였습니다.")
	}
	log.Printf("카카오페이 응답:%+v", kakaoPayResponse)
	return &kakaoPayResponse, nil
}



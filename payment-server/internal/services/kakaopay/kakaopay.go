/*
payment 패키지는 결제 게이트웨이와의 상호작용을 담당한다.
kakaopay.go는 KakaoPay 결제 요청을 처리하는 기능을 포함한다.
*/

package kakaopay

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"payment-server/internal/config"
	"payment-server/internal/entity"
)

// KakaoPayService는 KakaoPay API와 상호작용하기 위한 클라이언트 구조체입니다.
type KakaoPayService struct {
	APIEndpoint string
	Cid         string
	CidSecret   string
}

// KakaopayService 인스턴스 생성 함수
func NewKakaoPayService() *KakaoPayService {
	return &KakaoPayService{
		APIEndpoint: "https://open-api.kakaopay.com/online/v1/payment/ready",
		Cid:         config.Cid(),
		CidSecret:   config.CidSecret(),
	}
}

// RequestPayment는 카카오페이에 결제 요청을 보낸다.
func (s *KakaoPayService) RequestPayment(request entity.KakaoPayRequest) (*entity.KakaoPayResponse, error) {
	// 요청 본문 생성
	requestBody, err := json.Marshal(request)
	if err != nil {
		return nil, errors.New("결제 요청 본문을 생성하는데에 실패하였습니다")
	}

	// 카카오페이 API에 요청 전송
	req, err := http.NewRequest("POST", s.APIEndpoint, bytes.NewBuffer(requestBody))
	if err != nil {
		return nil, err
	}

	// 헤더설정
	req.Header.Set("Authorization", "SECRET_KEY "+s.CidSecret)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// 응답처리
	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("카카오페이 API호출 실패: " + resp.Status)
	}

	var kakaoPayResponse entity.KakaoPayResponse
	if err := json.NewDecoder(resp.Body).Decode(&kakaoPayResponse); err != nil {
		return nil, errors.New("카카오페이 응답을 파싱하는데에 실패하였습니다")
	}
	return &kakaoPayResponse, nil
}

/*
payment 패키지는 결제 게이트웨이와의 상호작용을 담당한다.
kakaopay.go는 KakaoPay 결제 요청을 처리하는 기능을 포함한다.
*/

package payment

import "payment/config"

// KakaoPayClient는 KakaoPay API와 상호작용하기 위한 클라이언트 구조체입니다.
type KakaoPayClient struct {
	APIEndpoint: string 
	Cid: string
	CidSecret string
}

// KakaopayClient 인스턴스 생성 함수
func newKakaoPayClient() *KakaoPayClient {
	return &KakaoPayClient {
		APIEndpoint: "https://open-api.kakaopay.com/online/v1/payment/ready"
		Cid: config.Cid()
	}
}

/*
models 패키지는 데이터 구조체를 정의한다.
kakaopay.go는 KakaoPay 결제 요청 및 응답을 위한 구조체를 정의한다.
*/

package models

// KakaoPayRequest는 KakaoPay에 결제 요청시 필요한 필드들을 나타낸다.
type KakaoPayRequest struct {
	cid            string `json:"cid"`              // 가맹점 cid
	cidSecret      string `json:"cid_secret"`       // 가맹점 코드 인증키
	partnerOrderId string `json:"partner_order_id"` // 가맹점 주문번호
	partnerUserId  string `json:"partner_user_id"`  // 가맹점 회원 id
	itemName       string `json:"item_name"`        // 상품명
	quantity       int    `json:"quantity"`         // 상품 수량
	totalAmount    int    `json:"total_amount"`     // 총액
	taxFreeAmount  int    `json:"tax_free_amount"`  // 비과 금액
	approvalUrl    string `json:"approval_url"`     // 결제 성공시 redirect url
	cancelUrl      string `json:"cancel_url"`       // 결제 취소시 redirect url
	failUrl        string `json:"fail_url"`
}

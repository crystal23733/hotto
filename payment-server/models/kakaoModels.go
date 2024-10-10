/*
models 패키지는 데이터 구조체를 정의한다.
kakaopay.go는 KakaoPay 결제 요청 및 응답을 위한 구조체를 정의한다.
*/

package models

// KakaoPayRequest는 KakaoPay에 결제 요청시 필요한 필드들을 나타낸다.
type KakaoPayRequest struct {
	Cid            string `json:"cid"`              // 가맹점 cid
	PartnerOrderId string `json:"partner_order_id"` // 가맹점 주문번호
	PartnerUserId  string `json:"partner_user_id"`  // 가맹점 회원 id
	ItemName       string `json:"item_name"`        // 상품명
	Quantity       int    `json:"quantity"`         // 상품 수량
	TotalAmount    int    `json:"total_amount"`     // 총액
	TaxFreeAmount  int    `json:"tax_free_amount"`  // 비과 금액
	ApprovalUrl    string `json:"approval_url"`     // 결제 성공시 redirect url
	CancelUrl      string `json:"cancel_url"`       // 결제 취소시 redirect url
	FailUrl        string `json:"fail_url"`
}

// KakaoPayResponse는 KakaoPay로부터의 응답을 나타낸다.
type KakaoPayResponse struct {
	Tid string `json:"tid"` // 결제 고유 번호
	NextRedirectAppUrl string `json:"next_redirect_app_url"` // 요청한 클라이언트가 모바일앱일경우 카카오톡결제페이지 URL
	NextRedirectMobileUrl string `json:"next_redirect_mobile_url"` // 요청한 클라이언트가 모바일웹일경우 카카오톡결제페이지 URL
	NextRedirectPcUrl string `json:"next_redirect_pa_url"` // 요청한 클라이언트가 PC일경우 카카오톡결제페이지 URL
	AndroidAppScheme string `json:"android_app_scheme"` // 카카오페이 결제 화면으로 이동하는 Android 앱 스킴(Scheme) - 내부 서비스용
	IosAppScheme string `json:"ios_app_scheme"` // 카카오페이 결제 화면으로 이동하는 iOS 앱 스킴 - 내부 서비스용
	CreatedAt string `json:"created_at"` // 결제 준비 요청 시간
}



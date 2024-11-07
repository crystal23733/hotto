package entity

// PaymentRequest는 상품의 정보를 정의한다.
type PaymentRequest struct {
	Amount int `json:"amount"`
	Date string `json:"date"`
	PaymentId string `json:"paymentId"`
}

// ILottoRoundData는 로또의 데이터를 정의한다.
type ILottoRoundData struct {
	TotSellamnt     int    `json:"totSellamnt"`       // 총 판매 금액
	ReturnValue     string `json:"returnValue"`       // API 응답 상태 (예: 'success')
	DrwNoDate       string `json:"drwNoDate"`         // 추첨 날짜
	FirstWinamnt    int    `json:"firstWinamnt"`      // 1등 당첨금
	DrwtNo6         int    `json:"drwtNo6"`           // 당첨 번호 6번
	DrwtNo4         int    `json:"drwtNo4"`           // 당첨 번호 4번
	FirstPrzwnerCo  int    `json:"firstPrzwnerCo"`    // 1등 당첨자 수
	DrwtNo5         int    `json:"drwtNo5"`           // 당첨 번호 5번
	BnusNo          int    `json:"bnusNo"`            // 보너스 번호
	FirstAccumamnt  int    `json:"firstAccumamnt"`    // 1등 누적 당첨금
	DrwNo           int    `json:"drwNo"`             // 회차 번호
	DrwtNo2         int    `json:"drwtNo2"`           // 당첨 번호 2번
	DrwtNo3         int    `json:"drwtNo3"`           // 당첨 번호 3번
	DrwtNo1         int    `json:"drwtNo1"`           // 당첨 번호 1번
}
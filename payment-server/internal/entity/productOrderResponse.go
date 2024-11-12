package entity

// ProductOrderResponse는 클라이언트에 제공될 주문내역 구조를 정의한다.
type ProductOrderResponse struct {
	PayOrderID    string `json:"pay_order_id"`
	Amount        int    `json:"amount"`
	Status        string `json:"status"`
	CreatedAt     string `json:"created_at"`
	CreatedAtDate string `json:"created_at_date"`
	LottoNumbers  []int  `json:"lotto_number"`
}

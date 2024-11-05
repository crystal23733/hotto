package entity

// PayOrderResponse는 클라이언트에 제공될 결제 정보를 나타내는 엔티티이다.
type PayOrderResponse struct {
	PayOrderID string `json:"pay_order_id"`
	Amount     int    `json:"amount"`
	Status     string `json:"status"`
	CreatedAt  string `json:"created_at"`
	pay        string `json:"pay"`
}

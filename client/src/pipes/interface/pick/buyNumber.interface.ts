export interface IPaymentResponse {
  success: boolean;
  message: string;
  lottoNumbers: number[];
}

export interface IPaymentRequest {
  pay_order_id: string;
  amount: number;
}

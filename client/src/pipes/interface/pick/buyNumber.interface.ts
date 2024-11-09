export interface IPaymentResponse {
  success: boolean;
  message: string;
  lottoNumbers: number[];
}

export interface IPaymentRequest {
  amount: number;
  date: string;
  paymentId: string;
}

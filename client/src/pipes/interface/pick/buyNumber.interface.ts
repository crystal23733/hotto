export interface IPaymentResponse {
  success: boolean;
  message: string;
}

export interface IPaymentRequest {
  amount: number;
  date: string;
  paymentId: string;
}

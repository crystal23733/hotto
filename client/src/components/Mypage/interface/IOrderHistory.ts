export default interface IOrderHistory {
  pay_order_id: string;
  amount: number;
  status: string;
  created_at: string;
  created_at_date: string;
  lotto_number: number[];
}

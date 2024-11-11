import IOrderHistory from "./IOrderHistory";
import IPaymentHistory from "./IPaymentHistory";

export type IHistoryItem = IPaymentHistory | IOrderHistory;

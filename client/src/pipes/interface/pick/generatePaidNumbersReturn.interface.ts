import { IPaymentRequest } from "./buyNumber.interface";

export default interface UseGeneratePaidNumbersReturn {
  numbers: number[];
  numberListRef: React.RefObject<HTMLDivElement>;
  generatePaidNumbers: (paymentDetails: IPaymentRequest) => Promise<void>;
  loading: boolean;
  error: Error | null;
  isSessionExpired: boolean;
}

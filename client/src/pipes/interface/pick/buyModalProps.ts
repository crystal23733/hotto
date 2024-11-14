import IModalProps from "@shared/interface/modal.interface";
import { IPaymentRequest } from "./buyNumber.interface";

export default interface BuyModalProps extends IModalProps {
  generatePaidNumbers: (PaymentDetails: IPaymentRequest) => Promise<void>;
}

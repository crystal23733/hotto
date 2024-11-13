import CommonModalProps from "./commonModalProps.interface";

export default interface AlertModalProps extends CommonModalProps {
  isVisible: boolean;
  onDoNotShowAgain?: () => void;
}

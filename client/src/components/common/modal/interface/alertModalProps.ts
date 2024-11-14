import CommonModalProps from "./commonModalProps";

export default interface AlertModalProps extends CommonModalProps {
  isVisible: boolean;
  onDoNotShowAgain?: () => void;
}

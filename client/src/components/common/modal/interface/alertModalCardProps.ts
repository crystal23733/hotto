import CommonModalProps from "./commonModalProps";

export default interface AlertModalCardProps extends CommonModalProps {
  onDoNotShowAgain?: () => void;
}

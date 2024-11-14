import CommonModalProps from "./commonModalProps.interface";

export default interface AlertModalCardProps extends CommonModalProps {
  onDoNotShowAgain?: () => void;
}

export default interface AlertModalProps {
  isVisible: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onDoNotShowAgain?: () => void;
}

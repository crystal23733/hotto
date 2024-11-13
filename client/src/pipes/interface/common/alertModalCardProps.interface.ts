export default interface AlertModalCardProps {
  title: string;
  content: string;
  onClose: () => void;
  onDoNotShowAgain?: () => void;
}

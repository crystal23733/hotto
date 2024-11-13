export default interface AlertButtonProps {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary";
}

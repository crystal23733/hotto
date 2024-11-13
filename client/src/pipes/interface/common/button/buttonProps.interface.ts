export default interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: "primary" | "secondary";
}

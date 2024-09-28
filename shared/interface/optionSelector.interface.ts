export default interface OptionSelectorProps {
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
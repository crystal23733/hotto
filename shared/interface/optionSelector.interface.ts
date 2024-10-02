export default interface OptionSelectorProps {
  selectedOption: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default interface IInputFieldProps {
    label: string;
    type: string;
    name: string;
    placeholder: string;
    minLength?: number;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    status: boolean;
}
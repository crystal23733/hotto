import React from "react";

interface OptionSelectorProps {
  selectedOption: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  selectedOption,
  onChange,
}) => {
  const unique = process.env.NEXT_PUBLIC_API_UNIQUE_ENDPOINT as string;
  return (
    <div id="options">
      <label htmlFor="lottoOption">번호 뽑기 옵션:</label>
      <select id="lottoOption" value={selectedOption} onChange={onChange}>
        <option value="default">기본 번호 뽑기 (무료)</option>
        <option value="even">짝수 번호 뽑기 (무료)</option>
        <option value="multipleOfThree">3의 배수 번호 뽑기 (무료)</option>
        <option value={unique}>역대 당첨 기록 없는 번호 뽑기 (유료)</option>
      </select>
    </div>
  );
};

export default OptionSelector;

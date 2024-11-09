import OptionSelectorProps from "client/src/pipes/interface/optionSelector.interface";
import React from "react";

const OptionSelector: React.FC<OptionSelectorProps> = ({
  selectedOption,
  onChange,
}) => {
  return (
    <div className="inline-container">
      <label htmlFor="lottoOption" className="label">
        번호 뽑기 옵션:
      </label>
      <div className="select">
        <select id="lottoOption" value={selectedOption} onChange={onChange}>
          <option value="default">기본 번호 뽑기 (무료)</option>
          <option value="even">짝수 번호 뽑기 (무료)</option>
          <option value="multipleOfThree">3의 배수 번호 뽑기 (무료)</option>
          <option value="unique">역대 당첨 기록 없는 번호 뽑기 (유료)</option>
        </select>
      </div>
    </div>
  );
};

export default OptionSelector;

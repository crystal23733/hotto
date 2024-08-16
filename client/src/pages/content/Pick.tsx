import React from "react";
import "../../scss/pick.scss";
import useGenerateNumbers from "client/src/hook/pick/useGenerateNumbers";
import NumberList from "client/src/components/pick/NumbersList";
import OptionSelector from "client/src/components/pick/OptionSelector";
import useLottoOptions from "client/src/hook/pick/useLottoOptions";

const Pick: React.FC = () => {
  const { numberListRef, generateNumbers } = useGenerateNumbers();
  const { selectedOption, handleOptionChange } = useLottoOptions();

  return (
    <div id="number">
      <div id="number__header">
        <header>번호 생성</header>
      </div>
      <OptionSelector
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />
      <NumberList numberListRef={numberListRef} />
      <input
        type="button"
        value="번호 생성"
        id="create"
        onClick={generateNumbers}
      />
    </div>
  );
};

export default Pick;

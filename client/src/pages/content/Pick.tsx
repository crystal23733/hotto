import React from "react";
import "../../scss/pick.scss";
import useGenerateNumbers from "client/src/hook/pick/useGenerateNumbers";
import NumberList from "client/src/components/pick/NumbersList";

const Pick: React.FC = () => {
  const { numberListRef, generateNumbers } = useGenerateNumbers();

  return (
    <div id="number">
      <div id="number__header">
        <header>번호 생성</header>
      </div>
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

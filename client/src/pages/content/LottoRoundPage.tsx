import RoundSelectOption from "client/src/components/lottoRoundPage/RoundSelectOption";
import React, { useState } from "react";
import "../../scss/lottoRoundPage.scss";
import LottoDataDetails from "client/src/components/common/LottoDataDetails";
import numberDataFetch from "client/src/hook/common/api/numberDataFetch";
import formatLottoNumbers from "client/src/utils/formatLottoNumbers";
import useNumberBalls from "client/src/hook/common/useNumberBall";
import NumberBalls from "client/src/components/common/NumberBalls";
import Loading from "client/src/components/common/Loading";

/**
 * 특정 회차의 로또 데이터를 가져와서 표시하는 페이지 컴포넌트입니다.
 *
 * @returns {JSX.Element} - 로또 회차 페이지를 구성하는 JSX 요소입니다.
 */
const LottoRoundPage: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<string>("");
  const { data, loading, error } = numberDataFetch(selectedRound);
  const numbers = formatLottoNumbers(data);
  const numberRefs = useNumberBalls(numbers);

  return (
    <div>
      <RoundSelectOption onSelectRound={setSelectedRound} maxRound={1134} />{" "}
      {/* 최대 회차는 예시 */}
      {loading && <Loading />}
      {error && <p>에러가 발생했습니다: {error.message}</p>}
      {data && <NumberBalls numbers={numbers} numberRefs={numberRefs} />}
      {data && <LottoDataDetails data={data} />}
    </div>
  );
};

export default LottoRoundPage;

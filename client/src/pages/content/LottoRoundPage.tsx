import LottoDataDisplay from "client/src/components/lottoRoundPage/LottoDataDisplay";
import RoundSelectOption from "client/src/components/lottoRoundPage/RoundSelectOption";
import useLottoRound from "client/src/hook/LottoRoundPage/useLottoRound";
import React, { useState } from "react";

/**
 * 특정 회차의 로또 당첨 번호를 조회하는 페이지 컴포넌트
 * @returns {JSX.Element} 로또 회차별 데이터 페이지 컴포넌트
 */
const LottoRoundPage: React.FC = () => {
  const [selectedRound, setSelectedRound] = useState<string>("history1134"); // 초기값을 최신 회차로 설정
  const { data, loading, error } = useLottoRound(selectedRound);

  const handleRoundSelect = (round: string) => {
    setSelectedRound(round);
  };

  return (
    <div>
      <h1>로또 당첨 번호 조회</h1>
      <RoundSelectOption
        onSelectRound={handleRoundSelect}
        maxRound={1134}
      />{" "}
      {/* 최대 회차 설정 */}
      {loading ? (
        <div>로딩중...</div>
      ) : error ? (
        <p>에러 발생: {error.message}</p>
      ) : (
        data && <LottoDataDisplay data={data} />
      )}
    </div>
  );
};

export default LottoRoundPage;

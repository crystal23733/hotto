import React from "react";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

interface LottoDataDisplayProps {
  data: ILottoRoundData;
}

/**
 * 회차별 로또 데이터를 표시하는 컴포넌트
 * @param {LottoDataDisplayProps} props - 로또 데이터
 * @returns {JSX.Element} 데이터 목록을 표시하는 컴포넌트
 */
const LottoDataDisplay: React.FC<LottoDataDisplayProps> = ({ data }) => {
  return (
    <div className="lotto-data">
      <p>
        <strong>회차:</strong> {data.drwNo}
      </p>
      <p>
        <strong>추첨 날짜:</strong> {data.drwNoDate}
      </p>
      <p>
        <strong>당첨 번호:</strong> {data.drwtNo1}, {data.drwtNo2},{" "}
        {data.drwtNo3}, {data.drwtNo4}, {data.drwtNo5}, {data.drwtNo6}
      </p>
      <p>
        <strong>보너스 번호:</strong> {data.bnusNo}
      </p>
      <p>
        <strong>1등 당첨금:</strong> {data.firstWinamnt.toLocaleString()} 원
      </p>
      <p>
        <strong>1등 누적 당첨금:</strong> {data.firstAccumamnt.toLocaleString()}{" "}
        원
      </p>
      <p>
        <strong>1등 당첨자 수:</strong> {data.firstPrzwnerCo} 명
      </p>
      <p>
        <strong>총 판매 금액:</strong> {data.totSellamnt.toLocaleString()} 원
      </p>
    </div>
  );
};

export default LottoDataDisplay;

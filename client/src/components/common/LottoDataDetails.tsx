import React from "react";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

/**
 * 로또 회차의 숫자 외의 데이터를 화면에 표시하는 컴포넌트입니다.
 *
 * @param {Object} props - 컴포넌트의 속성입니다.
 * @param {ILottoRoundData} props.data - 로또 회차 데이터를 포함하는 객체입니다.
 * @returns {JSX.Element} - 로또 데이터의 상세 정보를 나열하는 JSX 요소입니다.
 */
interface LottoDataDetailsProps {
  data: ILottoRoundData;
}

const LottoDataDetails: React.FC<LottoDataDetailsProps> = ({ data }) => {
  return (
    <div className="lotto-data-details">
      <p>총 판매 금액: {data.totSellamnt.toLocaleString()} 원</p>
      <p>1등 당첨금: {data.firstWinamnt.toLocaleString()} 원</p>
      <p>1등 당첨자 수: {data.firstPrzwnerCo} 명</p>
      <p>1등 누적 당첨금: {data.firstAccumamnt.toLocaleString()} 원</p>
      <p>추첨 날짜: {data.drwNoDate}</p>
      <p>회차 번호: {data.drwNo}</p>
    </div>
  );
};

export default LottoDataDetails;

import ILottoRoundData from "@shared/interface/lottoRound.interface";

/**
 * ILottoRoundData 데이터를 기반으로 번호 배열을 형식화하는 함수입니다.
 *
 * @param {ILottoRoundData} data - 로또 데이터
 * @returns {(number | string)[]} - 형식화된 번호 배열
 */
export default (data: ILottoRoundData | null): (number | string)[] => {
  if (!data) {
    return [];
  }
  return [
    data.drwtNo1,
    data.drwtNo2,
    data.drwtNo3,
    data.drwtNo4,
    data.drwtNo5,
    data.drwtNo6,
    "+",
    data.bnusNo,
  ];
};

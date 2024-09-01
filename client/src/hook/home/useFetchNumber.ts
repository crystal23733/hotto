import ILottoRoundData from "@shared/interface/lottoRound.interface";
import lastNumberApi from "client/src/api/content/lastNumberApi";
import { useState, useEffect } from "react";
/**
 * 주간 당첨 번호를 가져오는 커스텀 훅입니다.
 *
 * 이 훅은 `/assets/history/history1128.json` 파일에서 당첨 번호 데이터를 비동기적으로 가져오고,
 * 이 데이터를 상태로 관리하여 반환합니다.
 * 데이터는 번호와 보너스 번호를 포함하며, 중간에 플러스 기호(`+`)를 포함합니다.
 *
 * @returns {(number | string)[]} 번호와 보너스 번호, 플러스 기호를 포함하는 배열을 반환합니다.
 *
 * @date 24.08.08
 */
const useFetchNumbers = () => {
  const [numbers, setNumbers] = useState<(number | string)[]>([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        // API 호출을 통해 최신 당첨 번호 데이터를 가져옵니다.
        const data: ILottoRoundData = await lastNumberApi();

        // 가져온 데이터를 가공하여 상태로 설정합니다.
        const fetchedNumbers: (number | string)[] = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
          "+",
          data.bnusNo,
        ];
        setNumbers(fetchedNumbers);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchNumbers();
  }, []);

  return numbers;
};

export default useFetchNumbers;

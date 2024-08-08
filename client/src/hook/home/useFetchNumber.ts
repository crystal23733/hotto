import { useState, useEffect } from "react";

interface Data {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}
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
        const response = await fetch("/assets/history/history1128.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Data = await response.json();
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
        console.error("Error fetching data:", error);
      }
    };
    fetchNumbers();
  }, []);

  return numbers;
};

export default useFetchNumbers;

import LottoRoundPageApi from "client/src/api/content/LottoRoundPageApi";
import { useEffect } from "react";
import useApiRequest from "../common/api/useApiRequest";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

/**
 * 특정 회차의 로또 데이터를 가져오는 커스텀 훅
 * @param {string} round - 조회할 로또 회차
 * @returns {{data: LottoData | null, loading: boolean, error: Error | null}} 로또 데이터, 로딩 상태, 에러 상태
 */
export default (round: string) => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest<ILottoRoundData>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await LottoRoundPageApi(round);
        console.log(result);
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred"),
        );
      } finally {
        setLoading(false);
      }
    };
    if (round) {
      fetchData();
    }
  }, [round]);
  return { data, loading, error };
};

import ILottoRoundData from "@shared/interface/lottoRound.interface";
import lastNumberApi from "client/src/api/content/lastNumberApi";
import LottoRoundPageApi from "client/src/api/content/LottoRoundPageApi";
import { useState, useEffect } from "react";
import useApiRequest from "./useApiRequest";

/**
 * 당첨 번호를 가져오는 커스텀 훅입니다.
 *
 * @param {string} [round] - 로또 회차 (LottoRoundPage용)
 * @returns {{data: ILottoRoundData | null, loading: boolean, error: Error | null}} - 로또 데이터, 로딩 상태, 에러 상태를 반환합니다.
 */
export default (round?: string) => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest<ILottoRoundData>();

  useEffect(() => {
    const fetchNumbers = async () => {
      setLoading(true);
      try {
        const result: ILottoRoundData = round
          ? await LottoRoundPageApi(round)
          : await lastNumberApi();
        setData(result);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("An error occurred"),
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNumbers();
  }, [round, setData, setLoading, setError]);

  return { data, loading, error };
};

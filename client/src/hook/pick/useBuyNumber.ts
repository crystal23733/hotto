import useApiRequest from "../common/api/useApiRequest";
import { useCallback } from "react";
import buyNumberRequest from "client/src/api/content/pick/buyNumberRequest";
import {
  IPaymentRequest,
  IPaymentResponse,
} from "client/src/pipes/interface/pick/buyNumber.interface";

export default () => {
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest<IPaymentResponse>();
  const processBuy = useCallback(
    async (body: IPaymentRequest) => {
      setLoading(true);
      try {
        const response = await buyNumberRequest(body);
        setData(response);

        if (response.success) {
          return response.lottoNumbers; // 성공한 경우 번호 조합 반환
        } else {
          throw new Error(response.message); // 실패한 경우 메시지 던짐
        }
      } catch (error) {
        setError(error as Error);
        return null; // 실패한 경우 null 반환
      } finally {
        setLoading(false);
      }
    },
    [setData, setLoading, setError],
  );
  return {
    data,
    loading,
    error,
    processBuy,
  };
};

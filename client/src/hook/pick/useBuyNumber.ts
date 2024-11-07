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
        return response.success;
      } catch (error) {
        setError(error as Error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [setData, setLoading, setError],
  );
  return { data, loading, error, processBuy };
};

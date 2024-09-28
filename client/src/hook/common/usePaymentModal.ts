import { useEffect } from "react";
import useApiRequest from "./api/useApiRequest";
import paymentRequest from "client/src/api/pay/paymentRequest";

export default (option: string) => {
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const response = await paymentRequest(option);
      setData(response);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An Error occurred"),
      );
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, fetchPaymentData };
};

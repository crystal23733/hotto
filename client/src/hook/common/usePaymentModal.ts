import useApiRequest from "./api/useApiRequest";
import paymentRequest from "client/src/api/pay/paymentRequest";

/**
 * 결제 요청 커스텀 훅
 * @param {string} option - 결제 요청 금액
 * @returns {{
 *  data:string,
 *  error:string,
 *  loading:boolean,
 *  fetchPaymentData:Function
 * }}
 */
export default (option: number) => {
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      const response = await paymentRequest(option);
      setData(response);
      if(response.redirect_url){
	      window.location.href = response.redirect_url;
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error("An Error occurred"));
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, fetchPaymentData };
};

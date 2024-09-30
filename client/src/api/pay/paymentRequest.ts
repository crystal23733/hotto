import payServer from "client/src/module/payServer";
import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi(payServer);

/**
 * 결제 요청을 위한 API함수
 * @param {string} option - 요청할 금액
 * @returns {Promise} API응답 결과
 */
export default async (option: string) => {
  const payUrl = process.env.NEXT_PUBLIC_PAY_ENDPOINT as string;
  console.log(payServer, payUrl);
  return fetchApi.request(payUrl, "POST", { option }, null, true);
};

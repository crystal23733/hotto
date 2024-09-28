import payServer from "client/src/module/payServer";
import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi(payServer);

export default async (option: string) => {
  const payUrl = process.env.NEXT_PUBLIC_PAY_ENDPOINT as string;
  console.log(payServer, payUrl);
  return fetchApi.request(payUrl, "POST", { option }, null, true);
};

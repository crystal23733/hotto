import payServer from "client/src/module/payServer";
import FetchApi from "../../lib/FetchApi";
import {
  IPaymentRequest,
  IPaymentResponse,
} from "client/src/pipes/interface/pick/buyNumber.interface";

const fetchApi = new FetchApi<IPaymentResponse>(payServer);

export default async (body: IPaymentRequest): Promise<IPaymentResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT as string;
  const buyNumberUrl = process.env
    .NEXT_PUBLIC_PAY_BUY_NUMBER_ENDPOINT as string;
  return await fetchApi.request(
    apiUrl + buyNumberUrl,
    "POST",
    body,
    null,
    true,
  );
};

import FetchApi from "../lib/FetchApi";
import apiUrl from "client/src/module/apiUrl";
import ILottoRoundData from "@shared/interface/lottoRound.interface";
import payServer from "client/src/module/payServer";

const fetchApi = new FetchApi<ILottoRoundData>(payServer);

export default async (): Promise<ILottoRoundData> => {
  const latestNumberUrl = process.env
    .NEXT_PUBLIC_API_LATEST_NUMBER_ENDPOINT as string;
  return await fetchApi.request(apiUrl(latestNumberUrl), "GET");
};

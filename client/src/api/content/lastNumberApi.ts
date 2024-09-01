import FetchApi from "../lib/FetchApi";
import serverUrl from "client/src/module/serverUrl";
import apiUrl from "client/src/module/apiUrl";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

const fetchApi = new FetchApi<ILottoRoundData>(serverUrl);

export default async (): Promise<ILottoRoundData> => {
  const latestNumberUrl = process.env
    .NEXT_PUBLIC_API_LATEST_NUMBER_ENDPOINT as string;
  return await fetchApi.request(apiUrl(latestNumberUrl), "GET");
};

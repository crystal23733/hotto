import LottoData from "@shared/interface/lotto-data.interface";
import FetchApi from "../lib/FetchApi";
import serverUrl from "client/src/module/serverUrl";
import apiUrl from "client/src/module/apiUrl";

const fetchApi = new FetchApi<LottoData>(serverUrl);

export default async (): Promise<LottoData> => {
  const latestNumberUrl = process.env
    .NEXT_PUBLIC_API_LATEST_NUMBER_ENDPOINT as string;
  return await fetchApi.request(apiUrl(latestNumberUrl), "GET");
};

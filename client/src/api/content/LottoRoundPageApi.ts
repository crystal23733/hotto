import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import apiUrl from "client/src/module/apiUrl";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

const fetchApi = new FetchApi<ILottoRoundData>(serverUrl);

export default async (round: string): Promise<ILottoRoundData> => {
  return await fetchApi.request(apiUrl(round), "GET");
};

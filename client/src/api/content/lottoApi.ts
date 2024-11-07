import FetchApi from "../lib/FetchApi";
import apiUrl from "client/src/module/apiUrl";
import payServer from "client/src/module/payServer";

export default async (option: string): Promise<number[]> => {
  const fetchApi = new FetchApi<number[]>(payServer);
  return await fetchApi.request(apiUrl(`${option}`), "GET", null, null, true);
};

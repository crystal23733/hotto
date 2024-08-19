import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import apiUrl from "client/src/module/apiUrl";

export default async (option: string): Promise<number[]> => {
  const fetchApi = new FetchApi<number[]>(serverUrl);
  return await fetchApi.request(apiUrl(`${option}`), "GET", null, null, true);
};

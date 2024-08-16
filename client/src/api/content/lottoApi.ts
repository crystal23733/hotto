import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import apiUrl from "client/src/module/apiUrl";

export default async (option: string): Promise<number[]> => {
  const fetchApi = new FetchApi<number[]>(serverUrl);
  const apiUniqueUrl = process.env.NEXT_PUBLIC_API_UNIQUE_ENDPOINT as string;

  return await fetchApi.request(
    apiUrl(apiUniqueUrl, `/${option}`),
    "GET",
    undefined,
    undefined,
    true,
  );
};

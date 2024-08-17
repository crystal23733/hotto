import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";

const fetchApi = new FetchApi(serverUrl);

/**
 * 24.08.06
 * @returns {response} - 로그아웃 요청
 */
export default async () => {
  const logoutUrl = process.env.NEXT_PUBLIC_AUTH_LOGOUT_ENDPOINT as string;
  return await fetchApi.request(authUrl(logoutUrl), "POST", undefined, undefined, true);
};

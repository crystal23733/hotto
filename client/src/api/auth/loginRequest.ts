import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi(serverUrl);

/**
 * * 로그인데이터
 * @param email
 * @param password
 * @return response.json
 */
export default async (email: string, password: string) => {
  const loginUrl = process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT as string;
  return await fetchApi.request(
    loginUrl,
    "POST",
    { email, password },
    undefined,
    true,
  );
};

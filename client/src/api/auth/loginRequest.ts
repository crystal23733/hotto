import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";
import { ERROR_UNKNOWN } from "client/src/constants/error/errorMessage";

const fetchApi = new FetchApi<{ error?: string }>(serverUrl);

/**
 * * 로그인데이터
 * @param email
 * @param password
 * @return response.json
 */
export default async (email: string, password: string) => {
  const loginUrl = process.env.NEXT_PUBLIC_AUTH_LOGIN_ENDPOINT as string;
  try {
    return await fetchApi.request(
      authUrl(loginUrl),
      "POST",
      { email, password },
      null,
      true,
    );
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: ERROR_UNKNOWN };
  }
};

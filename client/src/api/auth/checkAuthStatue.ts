import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

const fetchApi = new FetchApi<AuthStatusResponse>(serverUrl);

/**
 * 24.08.06
 * @returns {response} - 세션 상태 확인
 */
export default async (): Promise<AuthStatusResponse> => {
  const statusUrl = process.env.NEXT_PUBLIC_AUTH_STATUS_ENDPOINT as string;
  return await fetchApi.request(
    authUrl(statusUrl),
    "GET",
    undefined,
    undefined,
    true,
  );
};

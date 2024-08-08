import FetchApi from "../lib/FetchApi";

interface AuthStatusResponse {
  isAuthenticated: boolean;
}

const fetchApi = new FetchApi<AuthStatusResponse>("http://localhost:8080");

/**
 * 24.08.06
 * @returns {response} - 세션 상태 확인
 */
export default async (): Promise<AuthStatusResponse> => {
  return await fetchApi.request(
    "/auth/status",
    "GET",
    undefined,
    undefined,
    true,
  );
};

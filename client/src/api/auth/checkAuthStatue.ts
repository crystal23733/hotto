import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi("http://localhost:8080");

/**
 * 24.08.06
 * @returns {response} - 세션 상태 확인
 */
export default async (): Promise<{ isAuthenticated: boolean }> => {
  return await fetchApi.request("/auth/status", "GET", undefined, undefined, true);
};

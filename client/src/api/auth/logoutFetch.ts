import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi("http://localhost:8080");

/**
 * 24.08.06
 * @returns {response} - 로그아웃 요청
 */
export default async () => {
  return await fetchApi.request(
    "/auth/logout",
    "POST",
    undefined,
    undefined,
    true,
  );
};

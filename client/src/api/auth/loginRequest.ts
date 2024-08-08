import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi("http://localhost:8080");

/**
 * * 로그인데이터
 * @param email
 * @param password
 * @return response.json
 */
export default async (email: string, password: string) => {
  return await fetchApi.request(
    "/auth/login",
    "POST",
    { email, password },
    undefined,
    true,
  );
};

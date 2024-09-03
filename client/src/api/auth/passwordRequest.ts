import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";

interface IPasswordRequestResponse {
  success: boolean;
  message?: string;
}

const fetchApi = new FetchApi<IPasswordRequestResponse>(serverUrl);

/**
 * 비밀번호 검증 요청을 서버에 보냅니다.
 * @param {string} password - 검증할 비밀번호
 * @returns {Promise<PasswordRequestResponse>} - 서버의 응답
 */
export default async (password: string) => {
  const passwordUrl = process.env
    .NEXT_PUBLIC_VERIFY_PASSWORD_ENDPOINT as string;
  return await fetchApi.request(
    authUrl(passwordUrl),
    "POST",
    { password },
    null,
    true,
  );
};

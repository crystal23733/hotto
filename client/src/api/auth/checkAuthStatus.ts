import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";

/**
 * 서버에서 반환되는 인증 상태와 사용자 이름을 포함하는 응답 인터페이스
 *
 * @interface AuthStatusResponse
 * @property {boolean} isAuthenticated - 사용자의 인증 상태를 나타냅니다.
 * @property {object} user - 인증된 사용자 정보를 포함하는 객체입니다.
 * @property {string} user.name - 인증된 사용자의 이름입니다.
 * @property {string} user.email - 인증된 사용자의 이메일입니다.
 */
interface AuthStatusResponse {
  isAuthenticated: boolean;
  user: {
    balance: number;
    name: string | null;
    email: string | null;
  };
}

const fetchApi = new FetchApi<AuthStatusResponse>(serverUrl);

/**
 * 사용자의 세션 상태를 확인하는 함수
 *
 * @returns {Promise<AuthStatusResponse>} 서버의 인증 상태와 사용자 이름을 반환하는 Promise입니다.
 * @throws {Error} 요청이 실패할 경우 에러를 발생시킵니다.
 */
export default async (): Promise<AuthStatusResponse> => {
  const statusUrl = process.env.NEXT_PUBLIC_AUTH_STATUS_ENDPOINT as string;
  return await fetchApi.request(authUrl(statusUrl), "GET", null, null, true);
};

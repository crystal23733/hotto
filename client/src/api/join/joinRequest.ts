import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import { ERROR_UNKNOWN } from "client/src/constants/error/errorMessage";

const fetchApi = new FetchApi<{ error?: string }>(serverUrl);

/**
 * 24.08.08
 * @return {response} 회원가입 요청 함수
 */
export default async (formData: {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
}) => {
  const joinUrl = process.env.NEXT_PUBLIC_JOIN_ENDPOINT as string;
  try {
    return await fetchApi.request(joinUrl, "POST", formData);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: ERROR_UNKNOWN };
  }
};

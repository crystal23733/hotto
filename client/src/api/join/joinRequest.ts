import FetchApi from "../lib/FetchApi";

const fetchApi = new FetchApi("http://localhost:8080");

/**
 * 24.08.08
 * @return {response} 회원가입 요청 함수
 */
export default async (formData: {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phone: string;
}) => {
  const joinUrl = process.env.NEXT_PUBLIC_JOIN_ENDPOINT as string;
  return await fetchApi.request(joinUrl, "POST", formData);
};

import FetchApi from "../lib/FetchApi";
import contentUrl from "client/src/module/contentUrl";
import fortuneServerUrl from "client/src/module/fortuneServer";

/**
 * 운세 요청을 위한 API 호출 함수
 *
 * @param {string} text 요청할 운세 내용
 * @returns {Promise} API 응답 결과
 * @date 2024.09.23
 */
const fetchApi = new FetchApi(fortuneServerUrl);

export default async (text: string) => {
  const fortuneText = process.env
    .NEXT_PUBLIC_CONTENT_FORTUNE_ENDPOINT as string;
  return fetchApi.request(
    contentUrl(fortuneText),
    "POST",
    { text },
    null,
    true,
  );
};

import FetchApi from "../lib/FetchApi";
import contentUrl from "client/src/module/contentUrl";
import fortuneServerUrl from "client/src/module/fortuneServer";

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

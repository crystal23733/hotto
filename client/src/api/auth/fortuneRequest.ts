import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import contentUrl from "client/src/module/contentUrl";

const fetchApi = new FetchApi(serverUrl);

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

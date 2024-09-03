import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import authUrl from "client/src/module/authUrl";

const fetchApi = new FetchApi(serverUrl);

export default async (password: string) => {
  const passwordUrl = process.env.NEXT_PUBLIC_PASSWORD_ENDPOINT as string;
  return await fetchApi.request(
    authUrl(passwordUrl),
    "POST",
    { "Content-type": "application/json" },
    { password },
    true,
  );
};

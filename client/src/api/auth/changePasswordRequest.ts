import serverUrl from "client/src/module/serverUrl";
import FetchApi from "../lib/FetchApi";
import IPasswordRequestResponse from "@shared/interface/verifyPassword.interface";
import authUrl from "client/src/module/authUrl";

const fetchApi = new FetchApi<IPasswordRequestResponse>(serverUrl);

export default async (
  oldPassword: string,
  changePassword: string,
  changePasswordConfirm: string,
): Promise<IPasswordRequestResponse> => {
  const changePasswordUrl = process.env
    .NEXT_PUBLIC_AUTH_CHANGE_PASSWORD_ENDPOINT as string;

  return await fetchApi.request(
    authUrl(changePasswordUrl),
    "PUT",
    { oldPassword, changePassword, changePasswordConfirm },
    null,
    true,
  );
};

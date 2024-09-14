import { useCallback, useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import { useRouter } from "next/router";
import changePasswordRequest from "client/src/api/auth/changePasswordRequest";

export default () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [changePassword, setChangePassword] = useState<string>("");
  const [changePasswordConfirm, setChangePasswordConfirm] =
    useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
  const router = useRouter();

  const verifyPassword = useCallback(async () => {
    setLoading(true);
    try {
      const result = await changePasswordRequest(
        oldPassword,
        changePassword,
        changePasswordConfirm,
      );
      if (result.success) {
        router.reload();
        setData(result);
        setOldPassword("");
        setChangePassword("");
        setChangePasswordConfirm("");
        return true;
      } else {
        setError(new Error(result.message));
        return false;
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("서버에서 얘기치 못한 오류가 발생하였습니다."),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [oldPassword, changePassword, changePasswordConfirm]);
  return {
    oldPassword,
    setOldPassword,
    changePassword,
    setChangePassword,
    changePasswordConfirm,
    setChangePasswordConfirm,
    data,
    verifyPassword,
    loading,
    error,
    setError,
  };
};

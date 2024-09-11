import { useState } from "react";
import useApiRequest from "../common/api/useApiRequest";
import { useRouter } from "next/router";

export default () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [changePassword, setChangePassword] = useState<string>("");
  const [changePasswordConfirm, setChangePasswordConfirm] =
    useState<string>("");
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
  const router = useRouter();
};

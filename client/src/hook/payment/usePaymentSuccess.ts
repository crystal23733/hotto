import { useEffect } from "react";
import FetchApi from "../../api/lib/FetchApi";
import { useRouter } from "next/router";
import PaymentApprovalResponse from "@shared/interface/payment/kakaoSuccess.interface";
import useApiRequest from "../common/api/useApiRequest";
import payServer from "../../module/payServer";

/**
 * 결제 요청을 처리하는 커스텀 훅
 * @returns {{data: PaymentApprovalResponse | null, loading: boolean, error: Error | null}}
 */

export default () => {
  const { data, loading, error, setData, setLoading, setError } =
    useApiRequest<PaymentApprovalResponse>();
  const router = useRouter();

  useEffect(() => {
    const pgToken = router.query.pg_token;
    if (typeof pgToken === "string") {
      setLoading(true);
      const payUrl = process.env.NEXT_PUBLIC_PAY_ENDPOINT as string;
      const approvalUrl = process.env
        .NEXT_PUBLIC_PAY_APPROVAL_ENDPOINT as string;
      const fetchApi = new FetchApi<PaymentApprovalResponse>(payServer);
      fetchApi
        .request(
          payUrl + approvalUrl,
          "POST",
          { pg_token: pgToken },
          null,
          true,
        )
        .then((reponse) => {
          setData(reponse);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [router.query, setData, setError, setLoading]);
  return { data, loading, error };
};

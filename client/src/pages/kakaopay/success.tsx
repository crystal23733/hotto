import React, { useEffect } from "react";
import "../../scss/kakaoSuccess.scss";
import { useRouter } from "next/router";
import usePaymentSuccess from "../../hook/payment/usePaymentSuccess";
import Loading from "client/src/components/common/Loading";

/**
 * 카카오페이 결제 성공 시 컴포넌트
 * @returns {JSX.Element} - 결제 성공 컴포넌트
 */
const KakaoPaymentSuccess: React.FC = () => {
  const { data, loading, error } = usePaymentSuccess();
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };
  return (
    <div className="payment-success">
      <h1>결제가 성공적으로 완료되었습니다.</h1>
      {data && (
        <div className="payment-details">
          <p>주문 번호: {data.partner_order_id}</p>
          <p>결제 금액: {data.amount.total}</p>
          <p>상품명: {data.item_name}</p>
        </div>
      )}
      {loading && <Loading />}
      {error && (
        <p className="error-message">에러가 발생햇습니다: {error.message}</p>
      )}

      <button className="home-button" onClick={handleHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default KakaoPaymentSuccess;

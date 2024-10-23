import { useEffect } from "react";
import { useRouter } from "next/router";

interface PaymentSecurityHook {
  initializePayment: () => void;
  cleanupPayment: () => void;
}

export default (): PaymentSecurityHook => {
  const router = useRouter();

  // 결제 시작 시 payment_in_progress 쿠키 설정
  const initializePayment = () => {
    document.cookie = `payment_in_progress=; path=/; max-age=1800`; // 30분 유효
  };

  // 결제 종료 시 payment_in_progress 쿠키 제거
  const cleanupPayment = () => {
    document.cookie =
      "payment_in_progress=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  // 페이지 이동 시 결제 진행 중 상태 확인
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const paymentPages = [
        "/kakaopay/success",
        "kakaopay/fail",
        "/kakaopay/cancel",
      ];
      if (!paymentPages.some((page) => url.includes(page))) {
        cleanupPayment();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);
  return { initializePayment, cleanupPayment };
};

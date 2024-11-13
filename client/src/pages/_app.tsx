import { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/common/Layout";
import "../scss/global.scss";
import AlertModal from "../components/common/modal/AlertModal";
import useAlertModal from "../hook/common/useAlertModal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { isModalVisible, handleModalClose, handleDoNotShowAgain } =
    useAlertModal();
  return (
    <AuthProvider>
      <Layout pageTitle={pageProps.pageTitle}>
        <Component {...pageProps} />
        <AlertModal
          isVisible={isModalVisible}
          title="테스트 알림"
          content="회원가입 시 실제 이메일과 비밀번호를 입력하지 말아주세요. 또한, 결제는 테스트 기간 동안 무료로 진행됩니다."
          onClose={handleModalClose}
          onDoNotShowAgain={handleDoNotShowAgain}
        />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;

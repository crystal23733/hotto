import { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout pageTitle={pageProps.pageTitle}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;

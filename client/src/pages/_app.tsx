import Header from "../components/header/header";
import Menu from "../components/menu";
import { AuthProvider } from "../context/AuthContext";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: any;
}) {
  return (
    <AuthProvider>
      <Header />
      <Menu />
      <main>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

export default MyApp;

import Header from "../components/header/header";
import Menu from "../components/menu";
import { AuthProvider } from "../context/AuthContext";

interface PageProps {
  someProp: string;
  anotherProp: number;
}

interface MyAppProps {
  Component: React.ComponentType<PageProps>;
  pageProps: PageProps;
}

// 화살표 함수로 MyApp 컴포넌트를 정의
const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Header />
      <Menu />
      <main>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
};

export default MyApp;

import Header from "../components/header/header";
import Menu from "../components/menu";

function MyApp({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <>
      <Header />
      <Menu />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
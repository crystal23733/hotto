import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./header/Header";
import Menu from "./Menu";

interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle = "Default Title",
}) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <Menu />
      <main>{children}</main>
    </>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import Head from "../components/customHead";
import Header from "../components/header/header";
import Menu from "../components/menu";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <Head pageTitle={pageTitle} />
      <Header />
      <Menu />
      {children}
    </>
  );
};

export default Layout;

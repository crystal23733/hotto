import React, {ReactNode} from "react";
import BasicTextProps from "./components/interface/basicTextProps";
import Head from "./components/customHead";
import Header from "./components/header";
import Menu from "./components/menu";

interface LayoutProps extends BasicTextProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle, scriptText }) => {
  return (
    <>
      <Head pageTitle={pageTitle} scriptText={scriptText} />
      <Header />
      <Menu />
      {children}
    </>
  );
}

export default Layout;
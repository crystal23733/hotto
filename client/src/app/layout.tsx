import React, { ReactNode } from "react";
import CustomHead from "../components/customHead";

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <>
      <CustomHead pageTitle={pageTitle} />
      {children}
    </>
  );
};

export default Layout;

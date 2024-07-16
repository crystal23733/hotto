import React, { ReactNode } from "react";
import HeadComponent from "./partials/head";
import HeaderComponent from "./partials/header";
import MenuComponent from "./partials/menu";
import PageTitle from "./interface/pageTitle";
import ScriptSrc from "./interface/scriptSrc";

interface LayoutComponentProps extends PageTitle, ScriptSrc {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutComponentProps> = ({
  children,
  pageTitle,
  scriptSrc,
}) => {
  return (
    <html lang="kr">
      <HeadComponent pageTitle={pageTitle} scriptSrc={scriptSrc} />
      <body>
        <HeaderComponent />
        <MenuComponent />
        <div id="content">{children}</div>
        <script src="your-script.js"></script>
      </body>
    </html>
  );
};

export default LayoutComponent;

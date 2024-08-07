import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./header/Header";
import Menu from "./Menu";

/**
 * 페이지 레이아웃을 정의하는 컴포넌트입니다.
 * 헤더와 메뉴를 포함하며, 페이지 제목과 자식 컴포넌트를 렌더링합니다.
 *
 * @interface LayoutProps
 *
 * @property {ReactNode} children - 이 레이아웃 내에서 렌더링될 자식 컴포넌트입니다.
 * @property {string} [pageTitle="Default Title"] - (선택적) 페이지의 제목을 설정합니다. 기본값은 "Default Title"입니다.
 */
interface LayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

/**
 * 페이지 레이아웃을 렌더링하는 컴포넌트입니다.
 * 헤더와 메뉴를 포함하며, 페이지 제목을 설정하고, 자식 컴포넌트를 렌더링합니다.
 *
 * @param {LayoutProps} props - 컴포넌트에 전달되는 속성입니다.
 * @param {ReactNode} props.children - 이 레이아웃 내에서 렌더링될 자식 컴포넌트입니다.
 * @param {string} [props.pageTitle="Default Title"] - (선택적) 페이지의 제목을 설정합니다. 기본값은 "Default Title"입니다.
 *
 * @returns {JSX.Element} 렌더링된 페이지 레이아웃입니다.
 *
 * @date 24.08.08
 */
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

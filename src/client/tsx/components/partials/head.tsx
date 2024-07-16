import React from "react";
import { Helmet } from "react-helmet-async";
import PageTitle from "../interface/pageTitle";
import ScriptSrc from "../interface/scriptSrc";

interface HeadComponentProps extends PageTitle, ScriptSrc {}

/**
 * @crystal23733 24.07.16
 * @param pageTitle title 동적추가
 * @param scriptSrc script src 동적 추가
 * @returns head 컴포넌트
 */
const HeadComponent: React.FC<HeadComponentProps> = ({
  pageTitle,
  scriptSrc,
}) => {
  return (
    <Helmet>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{`hotto | ${pageTitle}`}</title>
      <script src={scriptSrc}></script>
    </Helmet>
  );
};

export default HeadComponent;

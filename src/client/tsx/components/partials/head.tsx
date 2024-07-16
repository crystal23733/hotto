import React from "react";
import { Helmet } from "react-helmet-async";

interface HeadProps {
  pageTitle : string;
  scriptSrc : string;
}

const Head:React.FC<HeadProps> = ({pageTitle, scriptSrc}) => {
  return (
  <Helmet>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{`hotto | ${pageTitle}`}</title>
    <script src={scriptSrc}></script>
  </Helmet>
  )
}

export default Head;
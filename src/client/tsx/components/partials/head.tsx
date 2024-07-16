import React from "react";
import { Helmet } from "react-helmet-async";

interface HeadProps {
  pageTitle : string;
}

const Head:React.FC<HeadProps> = ({pageTitle}) => {
  return (
  <Helmet>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{`hotto | ${pageTitle}`}</title>
  </Helmet>
  )
}

export default Helmet;
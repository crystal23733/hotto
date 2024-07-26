import React from "react";
import Head from "next/head";

interface CustomHeadProps {
  pageTitle: string;
}

const CustomHead: React.FC<CustomHeadProps> = ({ pageTitle }) => {
  const title = Array.isArray(pageTitle) ? pageTitle.join(" ") : pageTitle;
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
  );
};

export default CustomHead;

import React from 'react';
import BasicTextProps from './interface/basicTextProps';
import Head from 'next/head';

interface CustomHeadProps extends BasicTextProps {
}

const CustomHead: React.FC<CustomHeadProps> = ({ pageTitle, scriptText }) => {
  const title = Array.isArray(pageTitle) ? pageTitle.join(' ') : pageTitle;
  return (
    <Head>
    <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://kit.fontawesome.com/8809ab29cc.js" crossOrigin="anonymous"></script>
      <title>{title}</title>
      <script src={scriptText}></script>
    </Head>
  );
}

export default CustomHead;
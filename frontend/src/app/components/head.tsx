import React from 'react';

interface HeadProps {
  pageTitle: string;
  scriptText : string;
}

const Head: React.FC<HeadProps> = ({ pageTitle, scriptText }) => {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <script src="https://kit.fontawesome.com/8809ab29cc.js" crossOrigin="anonymous"></script>
      <title>hotto | {pageTitle}</title>
      <script src={scriptText}></script>
    </head>
  );
}

export default Head;
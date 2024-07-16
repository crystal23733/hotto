import React from 'react';
import Head from './partials/head';
import Header from './partials/header';
import Menu from './partials/menu';

const Layout = ({ children, pageTitle, scriptSrc }) => {
  return (
    <html lang="kr">
      <Head pageTitle={pageTitle} scriptSrc={scriptSrc} />
      <body>
        <Header />
        <Menu />
        <div id="content">
          {children}
        </div>
        <script src="your-script.js"></script>
      </body>
    </html>
  );
};

export default Layout;
import React from 'react';
import Head from './components/partials/head';
import Header from './components/partials/header';
import Menu from './components/partials/menu';

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
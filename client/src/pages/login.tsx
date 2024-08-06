import React from "react";
import "../scss/login.scss";
import LoginFormContainer from "../components/login/loginFormContainer";
import Layout from "../app/layout";

const Login: React.FC = () => {
  return (
    <Layout pageTitle="Login">
      <LoginFormContainer />
    </Layout>
  );
};

export default Login;

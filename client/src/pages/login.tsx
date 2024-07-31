import React from "react";
import "../scss/login.scss";
import Layout from "../app/layout";
import LoginFormContainer from "../components/login/loginFormContainer";

const Login: React.FC = () => {
  return (
    <Layout pageTitle="Login">
      <LoginFormContainer />
    </Layout>
  );
};

export default Login;

import React from "react";
import "../scss/login.scss";
import Layout from "../app/layout";
import LoginFormViewModel from "../components/login/loginFormViewModel";

const Login: React.FC = () => {
  return (
    <Layout pageTitle="Login">
      <LoginFormViewModel />
    </Layout>
  );
};

export default Login;

import React from "react";
import "../scss/login.scss";
import Layout from "../app/layout";
import LoginForm from "../components/login/loginForm";

const Login: React.FC = () => {
  return (
    <Layout pageTitle="Login">
      <LoginForm />
    </Layout>
  );
};

export default Login;

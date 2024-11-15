import React from "react";
import "../scss/login.scss";
import LoginFormContainer from "../components/login/LoginFormContainer";

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <LoginFormContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;

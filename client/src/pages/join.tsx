import React from "react";
import "../scss/join.scss";
import JoinForm from "../components/join/joinForm";
import Layout from "../app/layout";

const Join: React.FC = () => {
  return (
    <Layout pageTitle="Join">
      <JoinForm />
    </Layout>
  );
};

export default Join;

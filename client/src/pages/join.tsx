import React from "react";
import Layout from "../app/layout";
import '../scss/join.scss';
import JoinForm from "../app/components/join/joinForm";

const Join:React.FC = () => {
  return (
    <Layout pageTitle="Join">
      <JoinForm />
    </Layout>
  );
}

export default Join;
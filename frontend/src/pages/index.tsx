import React from "react"
import Layout from "../app/layout";

const Home:React.FC = () => {
  return (
    <Layout pageTitle="Home" scriptText="./ts/thisWeek.ts">
      <div>Hi</div>
    </Layout>
  );
}

export default Home;
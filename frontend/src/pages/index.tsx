import React from "react"
import Layout from "../app/layout";

const Home:React.FC = () => {
  return (
    <Layout pageTitle="Home">
      <div id="this-week">
        <div id="this-week__header">
          <h1>금주 당첨번호</h1>
        </div>
        <div id="this-week__number">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <p>
            +
          </p>
          <div></div>
        </div>
      </div>
      <div id="content-box">
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <a href="">게시글입니다.</a>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Home;
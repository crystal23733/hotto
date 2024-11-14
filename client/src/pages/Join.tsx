import React from "react";
import "../scss/join.scss";
import JoinFormContainer from "../components/join/JoinFormContainer";

const Join: React.FC = () => {
  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <JoinFormContainer />
        </div>
      </div>
    </div>
  );
};

export default Join;

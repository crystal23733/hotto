import React from "react";
import "../../../scss/fortune.scss";

const BackgroundSky: React.FC = () => {
  return (
    <div className="night">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="shooting_star"></div>
      ))}
    </div>
  );
};

export default BackgroundSky;

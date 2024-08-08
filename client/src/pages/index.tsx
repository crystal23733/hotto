import React from "react";
import "../scss/home.scss";
import useFetchNumbers from "../hook/home/useFetchNumber";
import useSetNumberIds from "../hook/home/useSetNumberIds";
import NumbersDisplay from "../components/home/NumbersDisplay";
import ContentBox from "../components/home/ContentBox";

const Home: React.FC = () => {
  const numbers = useFetchNumbers();
  const numberRefs = useSetNumberIds(numbers);

  return (
    <>
      <NumbersDisplay numbers={numbers} numberRefs={numberRefs} />
      <ContentBox />
    </>
  );
};

export default Home;

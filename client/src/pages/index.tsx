import React from "react";
import "../scss/home.scss";
import ContentBox from "../components/home/ContentBox";
import useNumberBalls from "../hook/common/useNumberBall";
import NumberBalls from "../components/common/NumberBalls";
import numberDataFetch from "../hook/common/api/numberDataFetch";
import formatLottoNumbers from "../utils/formatLottoNumbers";
import LottoDataDetails from "../components/common/LottoDataDetails";
import Loading from "../components/common/Loading";

const Home: React.FC = () => {
  const { data, loading, error } = numberDataFetch();
  const numbers = data ? formatLottoNumbers(data) : [];
  const numberRefs = useNumberBalls(numbers);

  return (
    <>
      {loading && <Loading />}
      {error && <p>에러가 발생했습니다: {error.message}</p>}
      {data && <NumberBalls numbers={numbers} numberRefs={numberRefs} />}
      {data && <LottoDataDetails data={data} />}
      <ContentBox />
    </>
  );
};

export default Home;

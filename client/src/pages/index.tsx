import React, { useState, useEffect, useRef } from "react";
import Layout from "../app/layout";
import setNumberBgColor from "../ts/modules/utils/setNumberBgColor";
import "../scss/home.scss";

interface Data {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

const Home: React.FC = () => {
  const [numbers, setNumbers] = useState<(number | string)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  // * 주간 당첨번호를 정적파일로 불러오는 함수
  useEffect(() => {
    const weekNumData = async () => {
      try {
        const response = await fetch("/API/history/history1128.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Data = await response.json();
        const fetchedNumbers: (number | string)[] = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
          "+",
          data.bnusNo,
        ];
        setNumbers(fetchedNumbers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    weekNumData();
  }, []);

  // * number에 id를 담는 함수
  useEffect(() => {
    numberRefs.current.forEach((element, index) => {
      if (element) {
        element.id = `number${index + 1}`;
        setNumberBgColor(element);
      }
    });
  }, [numbers]);

  return (
    <Layout pageTitle="Home">
      <div id="this-week">
        <div id="this-week__header">
          <h1>금주 당첨번호</h1>
        </div>
        <div id="this-week__number">
          {numbers.map((number, index) => (
            <div
              key={index}
              ref={(el) => {
                // 올바른 타입으로 ref 설정
                if (el) numberRefs.current[index] = el;
              }}
            >
              {number}
            </div>
          ))}
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
};

export default Home;

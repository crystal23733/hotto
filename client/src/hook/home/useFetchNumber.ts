import { useState, useEffect } from "react";

interface Data {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
  bnusNo: number;
}

const useFetchNumbers = () => {
  const [numbers, setNumbers] = useState<(number | string)[]>([]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const response = await fetch("/assets/history/history1128.json");
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
    fetchNumbers();
  }, []);

  return numbers;
};

export default useFetchNumbers;

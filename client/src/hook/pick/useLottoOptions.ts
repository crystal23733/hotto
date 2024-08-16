import { useState } from "react";

const useLottoOptions = () => {
  const [selectedOption, setSelectedOption] = useState("default");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return { selectedOption, handleOptionChange };
};

export default useLottoOptions;

import { useState } from "react";

export default () => {
  const [selectedOption, setSelectedOption] = useState<number>(3000);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(e.target.value));
  };

  return { selectedOption, handleOptionChange };
};

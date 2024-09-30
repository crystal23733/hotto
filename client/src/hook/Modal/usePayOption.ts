import { useState } from "react";

export default () => {
  const [selectedOption, setSelectedOption] = useState<string>("3000");

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  return { selectedOption, handleOptionChange };
};

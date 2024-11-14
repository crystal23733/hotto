import { useEffect, useRef, useState } from "react";
import useBuyNumber from "./useBuyNumber";
import { IPaymentRequest } from "client/src/pipes/interface/pick/buyNumber.interface";
import setNumberBgColor from "client/src/utils/setNumberBgColor";

export default () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const numberListRef = useRef<HTMLDivElement>(null);
  const { processBuy, loading, error, isSessionExpired, setIsSessionExpired } =
    useBuyNumber();

  const generatePaidNumbers = async (paymentDetails: IPaymentRequest) => {
    const generatedNumbers = await processBuy(paymentDetails);
    if (generatedNumbers) {
      setNumbers(generatedNumbers);
    }
  };

  useEffect(() => {
    if (numberListRef.current) {
      const children = Array.from(
        numberListRef.current.children,
      ) as HTMLElement[];

      children.forEach((child, index) => {
        if (numbers[index] !== undefined) {
          child.textContent = numbers[index].toString();
          setNumberBgColor(child);
        } else {
          child.textContent = "";
          child.style.backgroundColor = "transparent";
        }
      });
    }
  }, [numbers]);

  return {
    numbers,
    numberListRef,
    generatePaidNumbers,
    loading,
    error,
    isSessionExpired,
    setIsSessionExpired,
  };
};

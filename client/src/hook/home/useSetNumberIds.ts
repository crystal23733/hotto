import setNumberBgColor from "client/src/utils/setNumberBgColor";
import { useEffect, useRef } from "react";

const useSetNumberIds = (numbers: (number | string)[]) => {
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    numberRefs.current.forEach((element, index) => {
      if (element) {
        element.id = `number${index + 1}`;
        setNumberBgColor(element);
      }
    });
  }, [numbers]);

  return numberRefs;
};

export default useSetNumberIds;

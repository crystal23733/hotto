import setNumberBgColor from "client/src/utils/setNumberBgColor";
import { useEffect, useRef } from "react";

/**
 * 숫자 리스트에 ID를 설정하고 배경 색상을 지정하는 커스텀 훅입니다.
 *
 * 이 훅은 주어진 숫자 배열을 기반으로 참조된 HTML 요소에 대해 ID를 설정하고,
 * `setNumberBgColor` 함수를 호출하여 각 요소의 배경 색상을 지정합니다.
 *
 * @param {(number | string)[]} numbers - 숫자와 문자열(플러스 기호)을 포함하는 배열입니다.
 * @returns {React.RefObject<HTMLDivElement>[]} HTMLDivElement 요소에 대한 참조를 담고 있는 배열입니다.
 *
 * @date 24.08.08
 */
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

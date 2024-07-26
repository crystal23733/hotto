// *숫자별 색상 할당 함수

import numberColor from "../../../../utils/numberColor";

// !번호 생성기에도 필요한 함수
export default (number: HTMLElement[]) => {
  number.forEach((child) => {
    numberColor(child);
  });
};

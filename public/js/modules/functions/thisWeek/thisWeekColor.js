// *숫자별 색상 할당 함수

import { numberColor } from '../number/numberColor.js';

// !번호 생성기에도 필요한 함수
export const thisWeekColor = (number) => {
  number.forEach((child) => {
    numberColor(child);
  });
};

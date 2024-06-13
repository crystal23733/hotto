import { repPick } from './modules/functions/pick/repPick.js';
import { numberEach } from './modules/functions/pick/text.js';
import { numberListArr } from './modules/selectors/pickSelec.js';
// *랜덤 번호를 지정해주는 함수
export const randomNumber = () => {
  // *1~45 번까지 저장하는 배열
  let number = [];
  for (let i = 1; i <= 45; i++) {
    number.push(i);
  }
  // *6개의 조합을 저장하는 배열
  let random = [];
  // *random배열의 조합(길이)가 6개가 될 때까지 반복
  while (random.length < 6) {
    repPick(number, random);
  }

  numberEach(numberListArr, random);
};

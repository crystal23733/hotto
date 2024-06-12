// todo 템플릿에 할당 해야함
// todo 모듈화 필요
// *random번호를 뽑기위한 함수

import { repPick } from './modules/functions/pick/repPick.js';
import { numberListArr } from './modules/selectors/pickSelec.js';
// *랜덤 번호를 지정해주는 함수
const randomNumber = () => {
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
  console.log(random);
  numberListArr.forEach((child, index) => {
    console.log(child);
    child.textContent = random[index];
    child.style.color = 'black';
  });
};

randomNumber();

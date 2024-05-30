// *숫자별 색상 할당 함수

import { numberAll } from "../../selector.js";

export const numberColor = () => {
  numberAll.homeNumber.forEach((child) => {
    const intText = parseInt(child.textContent);
    if(intText < 11){
      child.style.backgroundColor = '#FAC400';
    } else if(intText < 21){
      child.style.backgroundColor = '#69C8F2';
    } else if(intText < 31){
      child.style.backgroundColor = '#FF7171';
    } else if(intText < 41){
      child.style.backgroundColor = '#AAAAAA';
    } else if(intText < 46){
      child.style.backgroundColor = '#B0D840';
    }
  })
}
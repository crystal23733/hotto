// todo 1~11...+10마다 색상 변경

import { numberAll } from "../../selector.js";

const numberColor = () => {
  numberAll.homeNumber.forEach((child) => {
    console.dir(child);
    const intText = parseInt(child.textContent);
    if(intText < 12){
      child.style.backgroudColor = '#FAC400';
    }
  })
}

numberColor();
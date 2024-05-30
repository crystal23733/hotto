// todo 1~11...+10마다 색상 변경

import { numberAll } from "../../selector.js";

const numberColor = () => {
  numberAll.homeNumber.forEach((child) => {
    const intText = parseInt(child.textContent);
    if(intText < 12){
      child.style.backgroundColor = '#FAC400';
    }
    console.dir(child);
  })
}

numberColor();
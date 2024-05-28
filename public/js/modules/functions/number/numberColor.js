import { numberAll } from "../../selector.js";

const numberColor = () => {
  numberAll.homeNumber.forEach((child) => {
    console.log(child);
    const intText = parseInt(child.textContent);
    if(intText < 12){
      child.style.backgroudColor = '#FAC400';
    }
  })
}

numberColor();
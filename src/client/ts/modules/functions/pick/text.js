import { numberColor } from "../number/numberColor.js";

export const numberEach = (number, random) => {
  number.forEach((child, index) => {
    child.textContent = random[index];
    child.style.color = "white";
    numberColor(child);
  });
};

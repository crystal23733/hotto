import numberColor from "../../../../utils/numberColor";

export default (number: HTMLElement[], random: number[]) => {
  number.forEach((child, index) => {
    child.textContent = random[index].toString();
    child.style.color = "white";
    numberColor(child);
  });
};

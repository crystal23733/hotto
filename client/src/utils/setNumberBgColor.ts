export default (element: HTMLElement): void => {
  const intText = parseInt(element.textContent || "0", 10);
  if (intText < 11) {
    element.style.backgroundColor = "#FAC400";
  } else if (intText < 21) {
    element.style.backgroundColor = "#69C8F2";
  } else if (intText < 31) {
    element.style.backgroundColor = "#FF7171";
  } else if (intText < 41) {
    element.style.backgroundColor = "#AAAAAA";
  } else if (intText < 46) {
    element.style.backgroundColor = "#B0D840";
  }
};

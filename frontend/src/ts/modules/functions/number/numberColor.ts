export default (selector: HTMLElement) => {
  const intText = parseInt(selector.textContent || "0", 10);
  if (intText < 11) {
    selector.style.backgroundColor = "#FAC400";
  } else if (intText < 21) {
    selector.style.backgroundColor = "#69C8F2";
  } else if (intText < 31) {
    selector.style.backgroundColor = "#FF7171";
  } else if (intText < 41) {
    selector.style.backgroundColor = "#AAAAAA";
  } else if (intText < 46) {
    selector.style.backgroundColor = "#B0D840";
  }
};

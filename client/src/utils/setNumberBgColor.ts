/**
 * 숫자에 따라 HTML 요소의 배경색을 설정하는 함수입니다.
 *
 * 주어진 HTML 요소의 텍스트 내용을 숫자로 변환하고, 그 숫자에 따라 배경색을 변경합니다.
 *
 * @param {HTMLElement} element - 배경색을 설정할 대상 HTML 요소입니다. 요소의 텍스트 내용이 숫자로 해석됩니다.
 *
 * @example
 * const element = document.getElementById("number1");
 * if (element) {
 *   setNumberBgColor(element);
 * }
 *
 * @date 24.08.08
 */
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

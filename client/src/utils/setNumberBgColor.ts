/**
 * 숫자에 따라 HTML 요소의 배경색을 설정하는 함수입니다.
 *
 * 주어진 HTML 요소의 텍스트 내용을 숫자로 해석하고, 숫자 범위에 따라 배경색을 설정합니다.
 *
 * @param {HTMLElement} element - 배경색을 설정할 대상 HTML 요소입니다. 요소의 텍스트 내용이 숫자로 해석됩니다.
 *
 * @example
 * const element = document.getElementById("number1");
 * if (element) {
 *   setNumberBgColor(element);
 * }
 */
export default (element: HTMLElement): void => {
  const intText = parseInt(element.textContent || "0", 10);
  if (intText < 11) {
    element.style.background = "radial-gradient(circle, #f7e086, #d4ab00)";
  } else if (intText < 21) {
    element.style.background = "radial-gradient(circle, #8bc5f7, #3b8fbe)";
  } else if (intText < 31) {
    element.style.background = "radial-gradient(circle, #f7a3a3, #c94545)";
  } else if (intText < 41) {
    element.style.background = "radial-gradient(circle, #e0e0e0, #9c9c9c)";
  } else if (intText < 46) {
    element.style.background = "radial-gradient(circle, #c4e47d, #83b31d)";
  }
};

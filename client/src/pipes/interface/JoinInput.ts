/**
 * HTMLInputElement 타입의 요소들을 포함하는 객체를 정의하는 인터페이스입니다.
 *
 * @interface
 * @date 24.08.08
 */
export interface JoinInput {
  name: HTMLInputElement | null;
  email: HTMLInputElement | null;
  password: HTMLInputElement | null;
  checkPassword: HTMLInputElement | null;
  phone: HTMLInputElement | null;
}
/**
 * 주어진 요소가 HTMLInputElement인지 확인하는 타입 가드 함수입니다.
 *
 * @param {HTMLElement | null} element - 확인할 요소입니다.
 * @returns {element is HTMLInputElement} - 요소가 HTMLInputElement일 경우 true를 반환합니다.
 *
 * @date 24.08.08
 */
const isHTMLInputElement = (
  element: HTMLElement | null,
): element is HTMLInputElement => {
  return element !== null && element instanceof HTMLInputElement;
};
/**
 * 주어진 ID를 가진 HTML 요소를 반환하는 함수입니다.
 *
 * 요소가 HTMLInputElement인지 확인한 후, 해당 요소를 반환합니다.
 *
 * @param {string} id - 찾을 요소의 ID입니다.
 * @returns {HTMLInputElement | null} - 해당 ID를 가진 HTMLInputElement 요소 또는 null을 반환합니다.
 *
 * @date 24.08.08
 */
export const getInputElement = (id: string): HTMLInputElement | null => {
  const element = document.getElementById(id);
  return isHTMLInputElement(element) ? element : null;
};

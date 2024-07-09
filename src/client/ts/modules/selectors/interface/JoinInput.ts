export interface JoinInput {
  name: HTMLInputElement | null;
  email:HTMLInputElement | null;
  password: HTMLInputElement | null;
  checkPassword: HTMLInputElement | null;
  phone: HTMLInputElement | null;
}

// 모든 요소에 대해 타입 가드를 적용하여 안전하게 타입을 지정
// HTMLInputElement인지 확인하는 타입 가드 함수
const isHTMLInputElement = (element: HTMLElement | null): element is HTMLInputElement => {
  return element !== null && element instanceof HTMLInputElement;
};

// 모든 요소에 대해 타입 가드를 적용하여 안전하게 타입을 지정하는 함수
export const getInputElement = (id: string): HTMLInputElement | null => {
  const element = document.getElementById(id);
  return isHTMLInputElement(element) ? element : null;
};
import MultipleNumberPicker from "./multipleNumberPicker";

/**
 * 2의 배수만으로 무작위로 6개의 번호를 선택하는 함수입니다.
 * 
 * @returns {number[]} - 선택된 6개의 랜덤 2의 배수 번호를 포함하는 배열을 반환합니다.
 * 
 * @example
 * const evenNumbers = generateEvenNumbers();
 * 
 * @date 24.08.08
 */
export default function generateEvenNumbers(): number[] {
  const evenPicker = new MultipleNumberPicker(2, 44);  // 2의 배수, 최대값 44
  return evenPicker.pickMultiple(6);
}
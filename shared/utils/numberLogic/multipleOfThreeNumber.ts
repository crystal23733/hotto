import MultipleNumberPicker from "./multipleNumberPicker";

/**
 * 3의 배수만으로 무작위로 5개의 번호를 선택하는 함수입니다.
 * 
 * @returns {number[]} - 선택된 5개의 랜덤 3의 배수 번호를 포함하는 배열을 반환합니다.
 * 
 * @example
 * const tripleNumbers = generateTripleNumbers();
 * console.log(tripleNumbers); // 예: [3, 9, 18, 27, 42]
 * 
 * @date 24.08.08
 */
export default function generateTripleNumbers(): number[] {
  const triplePicker = new MultipleNumberPicker(3, 45);  // 3의 배수, 최대값 45
  return triplePicker.pickMultiple(6);
}
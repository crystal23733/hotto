import repPick from "./repPick";
/**
 * 1부터 45까지의 숫자 중에서 무작위로 6개의 번호를 선택하는 함수입니다.
 * 
 * 이 함수는 1에서 45까지의 숫자를 포함하는 배열을 생성한 후, 
 * `repPick` 함수를 사용하여 중복되지 않는 6개의 랜덤 번호를 선택합니다.
 * 
 * @returns {number[]} - 선택된 6개의 랜덤 번호를 포함하는 배열을 반환합니다.
 * 
 * @example
 * const randomNumbers = generateRandomNumbers();
 * console.log(randomNumbers); // 예: [5, 12, 23, 30, 34, 41]
 * 
 * @date 24.08.08
 */
export default (): number[] => {
  const number: number[] = [];
  for (let i = 1; i <= 45; i++) {
    number.push(i);
  }
  const random: number[] = [];
  while (random.length < 6) {
    repPick(number, random);
  }
  return random;
};

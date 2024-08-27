/**
 * 조합이 겹칠 경우 다시 뽑기를 수행하는 함수입니다.
 *
 * 주어진 배열에서 무작위로 숫자를 선택하고, 이미 선택된 숫자와 겹치지 않도록 합니다.
 *
 * @param {number[]} number - 1부터 시작하여 배열의 길이까지 포함된 숫자 배열입니다.
 * @param {number[]} random - 현재까지 선택된 숫자 배열입니다. 이 배열에 새로운 숫자가 추가됩니다.
 *
 * @example
 * const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
 * const selectedNumbers: number[] = [];
 * repPick(numbers, selectedNumbers);
 *
 * @date 24.08.08
 */
const repPick = (number: number[], random: number[]): void => {
  const randomPick = Math.ceil(Math.random() * number.length);
  if (random.includes(randomPick) === true) {
    repPick(number, random);
  } else {
    random.push(randomPick);
    random.sort((a, b) => a - b);
  }
};

export default repPick;

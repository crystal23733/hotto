/**
 * 특정 배수의 숫자들 중에서 랜덤하게 숫자를 선택하는 클래스입니다.
 */
class MultipleNumberPicker {
  private numbers: number[];

  /**
   * @param {number} multiple - 배수 (예: 2, 3 등)
   * @param {number} max - 최대값 (이 값 이하의 배수만 포함)
   * @date 24.08.18
   */
  constructor(multiple: number, max: number) {
    // 주어진 배수의 숫자들로 배열을 초기화합니다.
    this.numbers = Array.from(
      { length: Math.floor(max / multiple) },
      (_, i) => (i + 1) * multiple
    ).filter(num => num <= max);
  }

  /**
   * 랜덤하게 하나의 숫자를 선택합니다.
   * @returns {number} 선택된 숫자
   * @date 24.08.18
   */
  pickOne(): number {
    const randomIndex = Math.floor(Math.random() * this.numbers.length);
    return this.numbers[randomIndex];
  }

  /**
   * 중복 없이 여러 개의 숫자를 선택합니다.
   * @param {number} count - 선택할 숫자의 개수
   * @returns {number[]} 선택된 숫자들의 배열
   * @date 24.08.18
   */
  pickMultiple(count: number): number[] {
    if (count > this.numbers.length) {
      throw new Error("요청한 숫자의 개수가 가능한 숫자의 총 개수를 초과합니다.");
    }

    const result: number[] = [];
    const tempNumbers = [...this.numbers];

    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * tempNumbers.length);
      const selectedNumber = tempNumbers[randomIndex];
      result.push(selectedNumber);
      tempNumbers.splice(randomIndex, 1);
    }

    return result.sort((a, b) => a - b);
  }
}

export default MultipleNumberPicker;
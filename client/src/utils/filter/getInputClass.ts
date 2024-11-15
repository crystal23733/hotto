/**
 * 입력 필드의 유효성 상태에 따라 동적으로 CSS 클래스를 반환하는 함수
 *
 * @param {string} field - 입력 필드의 이름 ('old', 'new', 'confirm' 중 하나)
 * @param {boolean} lengthValid - 새 비밀번호 길이 유효성 상태
 * @param {boolean} matchValid - 새 비밀번호 확인 일치 유효성 상태
 * @param {string} changePassword - 현재 입력된 비밀번호 값
 * @param {string} changePasswordConfirm - 현재 입력된 비밀번호 확인 값
 * @returns {string} 입력 필드에 적용할 CSS 클래스명
 */
export default (
  field: "old" | "new" | "confirm",
  lengthValid: boolean,
  matchValid: boolean,
  changePassword: string,
  changePasswordConfirm: string,
) => {
  let baseClass = "input";
  if (field === "new" && changePassword) {
    baseClass += lengthValid ? " is-success" : " is-danger";
  }
  if (field === "confirm" && changePasswordConfirm) {
    baseClass += matchValid ? " is-success" : " is-danger";
  }
  return baseClass;
};

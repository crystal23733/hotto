// *회원가입 성공시 실행될 함수
// *DB로 옮겨서 빈 함수임.
export const joinSuccess = () => {};

// *회원가입 실패시 실행될 함수
export const joinFail = () => {
  console.error('입력한 정보가 유효하지 않습니다.');
  const p = document.createElement('p');
  joinForm.appendChild(p);
  p.style.color = 'red';
  p.textContent = '입력한 정보가 유효하지 않습니다.';
};

import { join } from '../../selectors/joinSelec.js';

// *회원가입 성공시 실행될 함수
export const joinSuccess = () => {
  // *회원 정보 오브젝트에 담기
  const joinObj = {
    name: join.name.value,
    email: join.email.value,
    password: join.password.value,
    checkPassword: join.checkPassword.value,
    phone: join.phone.value,
  };
};

// *회원가입 실패시 실행될 함수
export const joinFail = (event) => {
  event.preventDefault();
  console.error('입력한 정보가 유효하지 않습니다.');
  const p = document.createElement('p');
  joinForm.appendChild(p);
  p.style.color = 'red';
  p.textContent = '입력한 정보가 유효하지 않습니다.';
};

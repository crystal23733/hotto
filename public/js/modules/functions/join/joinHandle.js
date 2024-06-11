// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { USERNAME_KEY } from "../../KEY.js";
import { join } from "../../selectors/joinSelec.js";

// *회원가입 성공시 실행될 함수
export const joinSuccess = () => {
  // *회원 정보 오브젝트에 담기
  const joinObj = {
    name:join.name.value,
    email:join.email.value,
    password:join.password.value,
    checkPassword:join.checkPassword.value,
    phone:join.phone.value
  }
  // *오브젝트를 배열에 담음
  localStorage.setItem(USERNAME_KEY, JSON.stringify(joinObj));
}

// *회원가입 실패시 실행될 함수
export const joinFail = (event) => {
  event.preventDefault();
  console.error('입력한 정보가 유효하지 않습니다.');
  const p = document.createElement('p');
  joinForm.appendChild(p);
  p.style.color = 'red';
  p.textContent = '입력한 정보가 유효하지 않습니다.';
}
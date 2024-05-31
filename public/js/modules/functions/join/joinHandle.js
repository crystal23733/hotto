// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { USERNAME_KEY } from "../../KEY.js";
import { join, joinForm } from "../../selector.js";
import { conditional } from "./joinCondition.js";

// *회원가입 성공시 실행될 함수
const joinSuccess = (event) => {
  event.preventDefault(); // !함수 완성시 삭제
  // *회원 정보 오브젝트에 담기
  const joinObj = {
    name:join.name.value,
    email:join.email.value,
    password:join.password.value,
    checkPassword:join.checkPassword.value,
    phone:join.phone.value,
    joinLocation:join.joinLocation.value
  }
  console.log(conditional.passwordCon(joinObj.password, joinObj.checkPassword));
  console.log(conditional.phoneCon(joinObj.phone));
  // *오브젝트를 배열에 담음
  localStorage.setItem(USERNAME_KEY, JSON.stringify(joinObj));
}

// *회원가입 실패시 실행될 함수
const joinFail = (event) => {
  event.preventDefault();
  console.error('입력한 정보가 유효하지 않습니다.');
  const p = document.createElement('p');
  joinForm.appendChild(p);
  p.textContent = '입력한 정보가 유효하지 않습니다.';
}
// joinForm.addEventListener('submit', joinSuccess);
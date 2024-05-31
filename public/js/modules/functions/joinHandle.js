// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { join, joinForm } from "../selector.js";

// *localStorage에 회원정보를 담을 그릇
let users = [];

export const joinValue = () => {
  // *회원 정보 오브젝트에 담기
  const joinObj = {
    name:join.name.value,
    email:join.email.value,
    password:join.password.value,
    checkPassword:join.checkPassword.value,
    phone:join.phone.value,
    joinLocation:join.joinLocation.value
  }
  // *오브젝트를 배열에 담음
  users.push(joinObj);
  localStorage.setItem(USERNAME_KEY, JSON.stringify(joinObj));
}

export const joinError = (event) => {
  event.preventDefault();
  const p = document.createElement('p');
  joinForm.appendChild(p);
  p.textContent = '입력한 정보가 유효하지 않습니다.';
}
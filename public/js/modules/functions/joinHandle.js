// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { join, joinForm } from "../selector.js";

export const joinFormHandle = () => {
  joinForm.addEventListener('submit', (event) => {
    console.log(join.name.value);
    console.log(join.email.value);
    console.log(join.password.value)
    console.log(join.checkPassword.value);
    console.log(join.phone.value);
    console.log(join.joinLocation.value);
  });
}
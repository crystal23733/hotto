// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { join, joinForm } from "../selector.js";

export const joinFormHandle = () => {
  joinForm.addEventListener('submit', () => {
    console.log(join.name);
    console.log(join.email);
    console.log(join.password)
    console.log(join.checkPassword);
    console.log(join.phone);
    console.log(join.joinLocation);
  });
}
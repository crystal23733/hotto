// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { USERNAME_KEY } from "../KEY.js";
import { join } from "../selector.js";

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
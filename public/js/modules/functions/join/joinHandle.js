// todo DB연결 전까지 회원정보 스토리지나 POST처리로 json파일에 담아놓기

import { USERNAME_KEY } from "../../KEY.js";
import { join } from "../../selector.js";
import { conditional } from "./joinCondition.js";

export const joinValue = (event) => {
  event.preventDefault();
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
  // *오브젝트를 배열에 담음
  localStorage.setItem(USERNAME_KEY, JSON.stringify(joinObj));
}
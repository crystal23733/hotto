import { join, joinStatusBox } from "../../selector.js";
import { conditional } from "./joinCondition.js";

// *status-box의 컬러를 핸들링하는 함수
export const statusCondition = () => {
  join.name.addEventListener('change', () => {
    if(conditional.nameCon(join.name.value) === true){
      joinStatusBox.name.style.backgroundColor = 'green';
    } else {
      joinStatusBox.name.style.backgroundColor = 'red';
    }
  });
  join.email.addEventListener('change', () => {
    if(conditional.emailCon(join.email.value) === true){
      joinStatusBox.email.style.backgroundColor = 'green';
    } else {
      joinStatusBox.email.style.backgroundColor = 'red';
    }
  });
  join.password.addEventListener('change', () => {
    if(conditional.passwordLength(join.password.value) === true){
      joinStatusBox.password.style.backgroundColor = 'green';
    } else {
      joinStatusBox.password.style.backgroundColor = 'red';
    }
  });
  join.checkPassword.addEventListener('change', () => {
    if(conditional.passwordCon(join.password.value, join.checkPassword.value) === true){
      joinStatusBox.checkPassword.style.backgroundColor = 'green';
    } else {
      joinStatusBox.checkPassword.style.backgroundColor = 'red';
    }
  });
  join.phone.addEventListener('change', () => {
    if(conditional.phoneCon(join.phone.value) === true){
      joinStatusBox.phone.style.backgroundColor = 'green';
    } else {
      joinStatusBox.phone.style.backgroundColor = 'red';
    }
  });
}
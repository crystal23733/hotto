import { join, joinStatusBox } from "../../selector.js";
import { conditional } from "./joinCondition.js";

// *status-box의 컬러를 핸들링하는 함수
export const statusCondition = () => {
  let status = [false, false, false, false, false];
  join.name.addEventListener('change', () => {
    if(conditional.nameCon(join.name.value) === true){
      joinStatusBox.name.style.backgroundColor = 'green';
      if(status.indexOf(false) > -1){
        status.splice(false, 1, true);
        console.log(status);
      }
    } else {
      joinStatusBox.name.style.backgroundColor = 'red';
      if(status.indexOf(true) > -1){
        status.splice(true, 1, false);
        console.log(false);
        console.log(status);
      }
    }
  });
  join.email.addEventListener('change', () => {
    if(conditional.emailCon(join.email.value) === true){
      joinStatusBox.email.style.backgroundColor = 'green';
      if(status.indexOf(false) > -1){
        status.splice(false, 1, true);
        console.log(status);
      }
    } else {
      joinStatusBox.email.style.backgroundColor = 'red';
      if(status.indexOf(true) > -1){
        status.splice(true, 1, false);
        console.log(false);
        console.log(status);
      }
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
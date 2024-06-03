import { join, joinForm, joinStatusBox } from "../../selector.js";
import { statusSearch } from "../arrayOnOff.js";
import { conditional, joinCondition } from "./joinCondition.js";
import { joinFail, joinSuccess } from "./joinHandle.js";

// *status-box의 컬러와 최종적으로 status에 따라 회원가입을 핸들링 할 수 있는 함수
export const statusCondition = () => {
  // todo status배열 안의 모든 값이 true가 될 경우 가입 가능하게 할 것
  let status = [false, false, false, false, false];
  join.name.addEventListener('change', () => {
    if(conditional.nameCon(join.name.value) === true){
      joinStatusBox.name.style.backgroundColor = 'green';
      statusSearch.falseSearch(status);
      if(joinCondition.trueStatus(status) === true){
        joinForm.addEventListener('submit', joinSuccess);
      }
    } else {
      joinStatusBox.name.style.backgroundColor = 'red';
      statusSearch.trueSearch(status);
      joinForm.addEventListener('submit', joinFail);
    }
  });
  join.email.addEventListener('change', () => {
    if(conditional.emailCon(join.email.value) === true){
      joinStatusBox.email.style.backgroundColor = 'green';
      statusSearch.falseSearch(status);
      if(joinCondition.trueStatus(status) === true){
        joinForm.addEventListener('submit', joinSuccess);
      }
    } else {
      joinStatusBox.email.style.backgroundColor = 'red';
      statusSearch.trueSearch(status);
      joinForm.addEventListener('submit', joinFail);
    }
  });
  join.password.addEventListener('change', () => {
    if(conditional.passwordLength(join.password.value) === true){
      joinStatusBox.password.style.backgroundColor = 'green';
      statusSearch.falseSearch(status);
      if(joinCondition.trueStatus(status) === true){
        joinForm.addEventListener('submit', joinSuccess);
      }
    } else {
      joinStatusBox.password.style.backgroundColor = 'red';
      statusSearch.trueSearch(status);
      joinForm.addEventListener('submit', joinFail);
    }
  });
  join.checkPassword.addEventListener('change', () => {
    if(conditional.passwordCon(join.password.value, join.checkPassword.value) === true){
      joinStatusBox.checkPassword.style.backgroundColor = 'green';
      statusSearch.falseSearch(status);
      if(joinCondition.trueStatus(status) === true){
        joinForm.addEventListener('submit', joinSuccess);
      }
    } else {
      joinStatusBox.checkPassword.style.backgroundColor = 'red';
      statusSearch.trueSearch(status);
      joinForm.addEventListener('submit', joinFail);
    }
  });
  join.phone.addEventListener('change', () => {
    if(conditional.phoneCon(join.phone.value) === true){
      joinStatusBox.phone.style.backgroundColor = 'green';
      statusSearch.falseSearch(status);
      if(joinCondition.trueStatus(status) === true){
        joinForm.addEventListener('submit', joinSuccess);
      }
    } else {
      joinStatusBox.phone.style.backgroundColor = 'red';
      statusSearch.trueSearch(status);
      joinForm.addEventListener('submit', joinFail);
    }
  });
}
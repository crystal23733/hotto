import { conditional } from "./modules/functions/join/joinCondition.js";
import { joinFail, joinSuccess } from "./modules/functions/join/joinHandle.js";
import { statusCondition } from "./modules/functions/join/joinStatus.js";
import { join, joinForm } from "./modules/selector.js";

statusCondition();

if(conditional.nameCon(join.name.value) === conditional.nameCon(join.email.value) === conditional.nameCon(join.password.value) === conditional.nameCon(join.password.value, join.checkPassword.value) === conditional.nameCon(join.phone.value) === true){
  console.log('success');
  joinForm.addEventListener('submit', joinSuccess);
} else {
  console.log('fail');
  joinForm.addEventListener('submit', joinFail);
}
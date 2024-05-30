import { joinError, joinValue } from "./modules/functions/joinHandle.js";
import { join, joinForm } from "./modules/selector.js";


if(join.password.value === join.checkPassword.value){
  joinForm.addEventListener('submit', joinValue);
} else {
  joinError();
}

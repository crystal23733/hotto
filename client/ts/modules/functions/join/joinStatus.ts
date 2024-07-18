import { join, joinStatusBox } from "../../selectors/joinSelec";
import { statusSearch } from "../arrayOnOff";
import { conditional } from "./joinCondition";

// todo 생성자 함수로 요약할 수 있도록 하기
// *status-box의 컬러와 최종적으로 status에 따라 회원가입을 핸들링 할 수 있는 함수
export default (): void => {
  const status: boolean[] = [false, false, false, false, false];
  join.name!.addEventListener("change", (): void => {
    if (conditional.nameCon(join.name!.value) === true) {
      joinStatusBox.name!.style.backgroundColor = "green";
      statusSearch.falseSearch(status);
    } else {
      joinStatusBox.name!.style.backgroundColor = "red";
      statusSearch.trueSearch(status);
    }
  });
  join.email!.addEventListener("change", (): void => {
    if (conditional.emailCon(join.email!.value) === true) {
      joinStatusBox.email!.style.backgroundColor = "green";
      statusSearch.falseSearch(status);
    } else {
      joinStatusBox.email!.style.backgroundColor = "red";
      statusSearch.trueSearch(status);
    }
  });
  join.password!.addEventListener("change", (): void => {
    if (conditional.passwordLength(join.password!.value) === true) {
      joinStatusBox.password!.style.backgroundColor = "green";
      statusSearch.falseSearch(status);
    } else {
      joinStatusBox.password!.style.backgroundColor = "red";
      statusSearch.trueSearch(status);
    }
  });
  join.checkPassword!.addEventListener("change", (): void => {
    if (
      conditional.passwordCon(
        join.password!.value,
        join.checkPassword!.value,
      ) === true
    ) {
      joinStatusBox.checkPassword!.style.backgroundColor = "green";
      statusSearch.falseSearch(status);
    } else {
      joinStatusBox.checkPassword!.style.backgroundColor = "red";
      statusSearch.trueSearch(status);
    }
  });
  join.phone!.addEventListener("change", (): void => {
    if (conditional.phoneCon(join.phone!.value) === true) {
      joinStatusBox.phone!.style.backgroundColor = "green";
      statusSearch.falseSearch(status);
    } else {
      joinStatusBox.phone!.style.backgroundColor = "red";
      statusSearch.trueSearch(status);
    }
  });
};

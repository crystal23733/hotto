// *random번호를 뽑기위한 함수
// * scss 모듈
import "../scss/pick.scss";

// * js 모듈
import numberText from "./modules/functions/pick/numberText";
import randonNumber from "../../../shared/functions/randomNumber";
import { createBtn, numberListArr } from "./modules/selectors/pickSelec";

createBtn.addEventListener("click", () => {
  numberText(numberListArr, randonNumber());
});

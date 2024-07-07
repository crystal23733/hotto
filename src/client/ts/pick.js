// *random번호를 뽑기위한 함수
// * scss 모듈
import "../scss/pick.scss";

// * js 모듈
import { numberEach } from "./modules/functions/pick/text.js";
import randomNumber from "./modules/functions/randonNumber.js";
import { createBtn, numberListArr } from "./modules/selectors/pickSelec.js";

createBtn.addEventListener("click", () => {
  numberEach(numberListArr, randomNumber());
});

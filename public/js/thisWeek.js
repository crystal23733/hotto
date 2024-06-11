import { numberID } from "./modules/functions/number/numberID.js";
import { thisNumText } from "./modules/functions/number/thisNumber.js";
import { thisWeekNumber } from "./modules/selectors/weekNumSelec.js";

// *id 반복 할당 함수
numberID(thisWeekNumber.children);

// *번호별 색깔 함수
thisNumText();
import { numberColor } from "./modules/functions/number/numberColor.js";
import { numberID } from "./modules/functions/number/numberID.js";
import { thisWeekNumber } from "./modules/selector.js";

// *id 반복 할당 함수
numberID(thisWeekNumber.children);

// *번호별 색깔 함수
numberColor();
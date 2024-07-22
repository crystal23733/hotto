// *scss모듈
import "../scss/home.scss";

// *js모듈
import numberID from "./modules/functions/\bthisWeek/numberID";
import { thisNumText } from "./modules/functions/\bthisWeek/thisNumber";
import { thisWeekNumber } from "./modules/selectors/weekNumSelec";

// *id 반복 할당 함수
const children = thisWeekNumber?.children;
if (children && Array.isArray(children)) {
  numberID(Array.from(children) as HTMLElement[]);
}

// *번호별 색깔 함수
thisNumText();

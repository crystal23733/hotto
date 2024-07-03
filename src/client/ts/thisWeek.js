import { numberID } from './modules/functions/thisWeek/numberID.js';
import { thisNumText } from './modules/functions/thisWeek/thisNumber.js';
import { thisWeekNumber } from './modules/selectors/weekNumSelec.js';

// *id 반복 할당 함수
numberID(thisWeekNumber.children);

// *번호별 색깔 함수
thisNumText();

// todo 나중에 AJAX로 바꾸기
import data from "../../../API/history/history1123.json" with { type: "json" };

import { numberAll, thisNumber } from "../../selectors/weekNumSelec.js";
import thisWeekColor from "./thisWeekColor";

// *최근 회차를 불러오는 함수
export const thisNumText = () => {
  thisNumber.one!.textContent = data.drwtNo1.toString();
  thisNumber.two!.textContent = data.drwtNo2.toString();
  thisNumber.three!.textContent = data.drwtNo3.toString();
  thisNumber.four!.textContent = data.drwtNo4.toString();
  thisNumber.five!.textContent = data.drwtNo5.toString();
  thisNumber.six!.textContent = data.drwtNo6.toString();
  thisNumber.bonus!.textContent = data.bnusNo.toString();
  thisWeekColor(numberAll.homeNumber);
};

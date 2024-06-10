import { thisNumber } from "../../selector.js";
import { numberColor } from "./numberColor.js";

// *최근 회차를 불러오는 함수
export const thisNumText = () => {
  const xhr = new XMLHttpRequest();
  const url = '/public/js/API/historyNumber/history1123.json';
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    if(xhr.status === 200){
      const data = JSON.parse(xhr.response);
      console.log(data);
      thisNumber.one.textContent = data.drwtNo1;
      thisNumber.two.textContent = data.drwtNo2;
      thisNumber.three.textContent = data.drwtNo3;
      thisNumber.four.textContent = data.drwtNo4;
      thisNumber.five.textContent = data.drwtNo5;
      thisNumber.six.textContent = data.drwtNo6;
      thisNumber.bonus.textContent = data.bnusNo;
      numberColor();
    } else {
      console.error('데이터를 불러올 수 없습니다.');
    }
  }
}
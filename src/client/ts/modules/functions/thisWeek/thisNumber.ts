import { numberAll, thisNumber } from "../../selectors/weekNumSelec";
import thisWeekColor from "./thisWeekColor";

const fetchData = async () => {
  try {
    const response = await fetch("../../../API/history/history1123.json");
    if (!response.ok) {
      throw new Error("Failed to fetch JSON data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON data:", error);
    return null;
  }
};

// *최근 회차를 불러오는 함수
export const thisNumText = async () => {
  try {
    const data = await fetchData();
    if (!data) return;

    const { drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo } = data;
    thisNumber.one!.textContent = drwtNo1.toString();
    thisNumber.two!.textContent = drwtNo2.toString();
    thisNumber.three!.textContent = drwtNo3.toString();
    thisNumber.four!.textContent = drwtNo4.toString();
    thisNumber.five!.textContent = drwtNo5.toString();
    thisNumber.six!.textContent = drwtNo6.toString();
    thisNumber.bonus!.textContent = bnusNo.toString();
    thisWeekColor(numberAll.homeNumber);
  } catch (error) {
    console.error("Error processing JSON data:", error);
  }
};
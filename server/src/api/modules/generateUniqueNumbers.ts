// * 중복되지 않는 새로운 번호를 조합하는 함수

import randonNumber from "@shared/functions/randomNumber";
import loadHistory from "./loadHistory";

export default async (): Promise<number[]> => {
  const history: Set<string> = await loadHistory();
  let newNumbers: number[];
  do {
    newNumbers = randonNumber();
  } while (history.has(newNumbers.join(",")));
  console.log(newNumbers);
  return newNumbers;
};

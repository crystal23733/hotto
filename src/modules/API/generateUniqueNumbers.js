// * 중복되지 않는 새로운 번호를 조합하는 함수
import { randomNumber } from '../../../public/js/modules/functions/randonNumber.js';
import loadHistory from './loadHistory.js';

export default async () => {
  const history = await loadHistory;
  let newNumbers;
  do {
    newNumbers = randomNumber();
  } while (history.has(newNumbers.join(',')));
  return newNumbers;
};

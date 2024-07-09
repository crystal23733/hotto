// *조합이 겹칠 경우 뽑기 반복하는 함수
const repPick = (number:number[], random:number[]):void => {
  let randomPick = Math.ceil(Math.random() * number.length);
  if (random.includes(randomPick) === true) {
    repPick(number, random);
  } else {
    random.push(randomPick);
    random.sort((a, b) => a - b);
  }
};

export default repPick;

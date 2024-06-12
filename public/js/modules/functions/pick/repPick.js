// *조합이 겹칠 경우 뽑기 반복하는 함수
export const repPick = (number, random) => {
  let randomPick = Math.ceil(Math.random() * number.length);
  console.log(random.includes(randomPick));
  if (random.includes(randomPick) === true) {
    repPick(number, random);
  } else {
    random.push(randomPick);
    random.sort((a, b) => a - b);
  }
};

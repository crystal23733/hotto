// todo 템플릿에 할당 해야함
// todo 모듈화 필요
// *random번호를 뽑기위한 함수
const randomNumber = () => {
  // *1~45 번까지 저장하는 배열
  let number = [];
  for (let i = 1; i <= 45; i++) {
    number.push(i);
  }
  // *6개의 조합을 저장하는 배열
  let random = [];
  // *random배열의 조합(길이)가 6개가 될 때까지 반복
  while (random.length < 6) {
    repPick(number, random);
  }
};

// *조합이 겹칠 경우 뽑기 반복하는 함수
const repPick = (number, random) => {
  let randomPick = Math.ceil(Math.random() * number.length);
  console.log(random.includes(randomPick));
  if (random.includes(randomPick) === true) {
    repPick(number, random);
  } else {
    random.push(randomPick);
    random.sort((a, b) => a - b);
  }
};

randomNumber();

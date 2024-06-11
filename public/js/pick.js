// todo 랜덤 번호를 생성할 수 있게 되면
// todo 템플릿에 할당 해야함
// *random번호를 뽑기위한 함수
const randomNumber = () => {
  let number = [];
  for(let i = 1; i <= 45; i++){
    number.push(i);
  }
  console.log(number);
}

randomNumber();
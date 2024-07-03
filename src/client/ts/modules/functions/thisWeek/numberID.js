// *ID로 붙일 배열
const number = ['number1','number2','number3','number4','number5','number6','bonus'];

// *각 번호의 배열 길이 순서와 id로 사용할 각 number순번이 같을 경우 id 할당
export const numberID = (week) => {
  for(let i = 0; i < week.length; i++){
    for(let j = 0; j < number.length; j++){
      if(i === j){
        week[i].id = number[j];
      } else if(i === 6){
        i++;
        j += 6;
        week[i].id = number[j];
      } else if(i === 6){
        continue;
      }
    }
  };
}

// todo 번호마다 id 붙이기
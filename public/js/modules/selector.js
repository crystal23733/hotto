// *이번주 번호 선택자 / this-week
const thisWeekNumber = document.getElementById('this-week__number');

const number = ['number1','number2','number3','number4','number5','number6','bonus'];

const numberID = (week) => {
  for(let i = 0; i < week.length; i++){
    for(let j = 0; j < number.length; j++){
      if(i === j){
        week[i].id = number[j];
        console.dir(week[i]);
      } else if(i === 6){
        i++;
        j += 6;
        week[i].id = number[j];
        console.dir(week[i]);
      } else if(i === 6){
        continue;
      }
    }
  } 
}

// *thisWeekNumber.children
// todo 당첨번호별 색깔 핸들링을 위한 DOM API 선택자 만들기
// todo 번호마다 id 붙이기
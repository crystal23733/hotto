// *이번주 번호 선택자 / this-week
export const thisWeekNumber = document.getElementById('this-week__number');

export const numberAll = {
  homeNumber : document.querySelectorAll('#this-week__number div'),
}

export const thisNumber = {
  one : thisWeekNumber.children[0],
  two : thisWeekNumber.children[1],
  three : thisWeekNumber.children[2],
  four : thisWeekNumber.children[3],
  five : thisWeekNumber.children[4],
  six : thisWeekNumber.children[5],
  bonus : thisWeekNumber.children[7],
}

// *join html 선택자
export const joinForm = document.getElementById('join-form');
export const join = {
  name : document.getElementById('name'),
  email : document.getElementById('email'),
  password : document.getElementById('password'),
  checkPassword : document.getElementById('checkPassword'),
  phone : document.getElementById('phone'),
}
export const joinStatusBox = {
  name : document.getElementById('name-box'),
  email : document.getElementById('email-box'),
  password : document.getElementById('password-box'),
  checkPassword : document.getElementById('checkPassword-box'),
  phone : document.getElementById('phone-box'),
}
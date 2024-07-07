// *이번주 번호 선택자 / this-week
export const thisWeekNumber = document.getElementById("this-week__number");

export const numberAll = {
  homeNumber: document.querySelectorAll("#this-week__number div"),
};

export const thisNumber = {
  one: thisWeekNumber.children[0],
  two: thisWeekNumber.children[1],
  three: thisWeekNumber.children[2],
  four: thisWeekNumber.children[3],
  five: thisWeekNumber.children[4],
  six: thisWeekNumber.children[5],
  bonus: thisWeekNumber.children[7],
};

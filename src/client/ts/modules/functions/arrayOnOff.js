// *배열 안에 특정 값을 찾아내고 교체하는 함수
export const statusSearch = {
  falseSearch: (statusArr) => {
    const falseSearch = statusArr.indexOf(false);
    if (falseSearch > -1) {
      statusArr.splice(falseSearch, 1, true);
    }
  },
  trueSearch: (statusArr) => {
    const trueSearch = statusArr.indexOf(true);
    if (trueSearch > -1) {
      statusArr.splice(trueSearch, 1, false);
    }
  },
};

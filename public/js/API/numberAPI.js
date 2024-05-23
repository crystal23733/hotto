export const mainNumFetch = () => {
  let round = 1120;
  let url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+${round}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    if(xhr.status === 200){
      console.log(JSON.parse(xhr.response));
    } else {
      console.error('Error', xhr.status, xhr.statusText);
    }
  }
}
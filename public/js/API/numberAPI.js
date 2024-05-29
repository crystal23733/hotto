const numHistoryAPI = () => {
  const xhr = new XMLHttpRequest();
  let url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+1';
  xhr.open('GET', url);
  xhr.setRequestHeader('content-type', 'text/plain');
  xhr.send();
  xhr.onload = () => {
    if(xhr.status === 302){
      console.log(JSON.parse(xhr.response));
    } else {
      console.error('Error', xhr.status, xhr.statusText);
    }
  }
}

numHistoryAPI();
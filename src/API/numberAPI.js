import https from 'https';
import fs from 'fs';
import path from 'path';
import { __dirname } from '../modules/findDirectory.js';

const numberAPI = () => {
  let i = 1;
  let url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+${i}`;
  setInterval(() => {
    https.get(url, (res) => {
    let body = '';
    res.on('data', (data) => {
      body += data.toString();
      fs.writeFile(path.join(__dirname, `/public/js/API/historyNumber/history${i}.json`), body, (err) => {
        if(err){
          throw new Error('데이터를 생성할 수 없습니다.');
        }
        console.log('데이터를 성공적으로 생성하였습니다.');
      });
    });
  });
  }, 15000);
}

numberAPI();
import https from 'https';
import { __dirname } from '../modules/findDirectory.js';
import path from 'path';
// *JSON파일 또한 필요하여 파일을 만들기 위한 fs
import fs from 'fs';

const lottoAPIFunc = () => {

  const lottoAPI = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+1`;
  https.get(lottoAPI, (res) => {
    res.on('data', (data) => {
      const numAPI = JSON.parse(data);
      // fs.writeFile(path.join(__dirname, 'public/js/API/historyNumber/'))
      console.log(numAPI);
    })
  })
}
import path from 'path';
import { __dirname } from '../modules/findDirectory.js';
import fs from 'fs';

export const getLottoData = (req, res) => {
  const lottoData = [];
  for (let i = 1; i <= 1124; i++) {
    const filePath = path.join(
      __dirname,
      `public/js/API/history/history${i}.json`,
    );
    console.log(filePath);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        console.error(err);
      }
      const jsonData = JSON.parse(data);
      const drawNumbers = [
        jsonData.drwtNo1,
        jsonData.drwtNo2,
        jsonData.drwtNo3,
        jsonData.drwtNo4,
        jsonData.drwtNo5,
        jsonData.drwtNo6,
      ];
      lottoData.push(drawNumbers);
      console.log(lottoData);
    });
  }
};

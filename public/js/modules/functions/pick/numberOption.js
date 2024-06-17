import fs from 'fs';
import path from 'path';
import { __dirname } from '../../../../../src/modules/findDirectory.js';

export const numberOption = () => {
  for (let i = 1; i <= 1124; i++) {
    let dataArr = [];
    const dataFile = fs.readFile(
      path.join(__dirname, `public/js/API/history/history${i}.json`),
      (err, data) => {
        if (err) {
          console.error(err);
        }
        const jsonData = JSON.parse(data);
        dataArr.push(jsonData);
        console.log(dataArr);
      },
    );
  }
};

numberOption();

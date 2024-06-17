import fs from 'fs';
import path from 'path';
import { __dirname } from '../../../../../src/modules/findDirectory.js';

export const numberOption = () => {
  let dataArr = [];
  for (let i = 1; i <= 1124; i++) {
    const dataFile = fs.readFile(
      path.join(__dirname, `public/js/API/history${i}`),
      (err, data) => {
        if (err) {
          console.error('파일을 읽어올 수 없습니다.');
        }
        console.log(data);
      },
    );
  }
};

numberOption();

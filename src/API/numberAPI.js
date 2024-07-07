// ! 역대 당첨번호를 가져오기 위한 실행파일

import https from "https";
import fs from "fs";
import path from "path";
import __dirname from "../modules/__dirname.js";

// !트래픽 초과 방지를 위해 일정한 시간마다 데이터 생성
const numberAPI = () => {
  let i = 1125;
  const autoDataCreate = setInterval(() => {
    let url = `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=+${i}`;
    console.log(i, url);
    https.get(url, (res) => {
      let body = "";
      res.on("data", (data) => {
        body += data.toString();
        fs.writeFile(
          path.join(__dirname, `/public/js/API/history/history${i}.json`),
          body,
          (err) => {
            if (err) {
              throw new Error("데이터를 생성할 수 없습니다.");
            }
            console.log("데이터를 성공적으로 생성하였습니다.", i);
            i++;
          },
        );
      });
    });
    if (i === 1125) {
      clearInterval(autoDataCreate);
    }
  }, 7000);
};

numberAPI();

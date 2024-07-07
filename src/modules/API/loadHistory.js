// *apiData 전부 읽어오는 함수
import fs from "fs/promises";
import path from "path";
import __dirname from "../__dirname.js";

const HISTORY_DIR = path.join(__dirname, "public/js/API/history");

export default async () => {
  const historyData = new Set();
  try {
    const files = await fs.readdir(HISTORY_DIR);
    for (const file of files) {
      const filePath = path.join(HISTORY_DIR, file);
      const data = JSON.parse(await fs.readFile(filePath, "utf-8"));
      const numbers = [
        data.drwtNo1,
        data.drwtNo2,
        data.drwtNo3,
        data.drwtNo4,
        data.drwtNo5,
        data.drwtNo6,
      ].join(",");
      historyData.add(numbers);
    }
  } catch (error) {
    console.error("Error reading directory:", error);
    throw error;
  }
  return historyData;
};

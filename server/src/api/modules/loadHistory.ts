import fs from "fs/promises";
import path from "path";

interface HistoryData {
  drwtNo1: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo4: number;
  drwtNo5: number;
  drwtNo6: number;
}

const HISTORY_DIR: string =
  process.env.HISTORY_DIR || path.resolve("src/assets/history");

export default async (): Promise<Set<string>> => {
  const historyData = new Set<string>();
  try {
    const files = await fs.readdir(HISTORY_DIR);
    for (const file of files) {
      const filePath = path.join(HISTORY_DIR, file);
      const data: HistoryData = JSON.parse(
        await fs.readFile(filePath, "utf-8"),
      );
      const numbers: string = [
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

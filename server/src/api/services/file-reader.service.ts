import { Injectable } from "@nestjs/common";
import { join, resolve } from "path";
import LottoData from "../../../../shared/interface/lotto-data.interface";
import { promises as fs } from "fs";

@Injectable()
export class FileReaderService {
  private readonly historyDir = resolve("src/assets/history");
  /**
   * 최신 회차의 로또 데이터를 JSON 파일에서 읽어오는 메서드입니다.
   *
   * @returns {Promise<LottoData>} - 최신 회차의 로또 데이터
   * @throws {Error} - JSON 파일을 찾을 수 없거나 파일을 읽는 데 실패한 경우 에러를 발생시킵니다.
   */
  async getLatestLottoData(): Promise<LottoData> {
    try {
      const files = await fs.readdir(this.historyDir);

      // localeCompare: 파일 이름을 자연스러운 숫자 순서로 정렬하기 위해 사용됩니다.
      // 이 메서드는 문자열을 비교할 때, 숫자가 포함된 문자열의 경우 숫자 크기에 따라 정렬되도록 해줍니다.
      const latestFile = files
        .filter((file) => file.endsWith(".json"))
        .sort((a, b) => b.localeCompare(a, undefined, { numeric: true }))[0];

      if (!latestFile) {
        throw new Error("유효한 JSON 파일을 찾을 수 없습니다.");
      }

      const filePath = join(this.historyDir, latestFile);
      const data = await fs.readFile(filePath, "utf-8");

      return JSON.parse(data) as LottoData;
    } catch (error) {
      throw new Error("파일을 읽는 중 오류가 발생했습니다.");
    }
  }
}

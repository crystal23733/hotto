import { Injectable } from "@nestjs/common";
import generateUniqueNumbers from "./modules/generateUniqueNumbers";
import { FileReaderService } from "./services/file-reader.service";
import LottoData from "../../../shared/interface/lotto-data.interface";

@Injectable()
export class ApiService {
  constructor(private readonly fileReaderService: FileReaderService) {}

  /**
   * 로또 번호 조합을 생성하여 반환하는 메서드입니다.
   *
   * 이 메서드는 고유한 로또 번호 조합을 생성하기 위해 `generateUniqueNumbers` 함수를 호출합니다.
   *
   * @returns {Promise<number[]>} - 고유한 로또 번호 조합
   */
  async getLottoData(): Promise<number[]> {
    return generateUniqueNumbers();
  }

  /**
   * 최신 회차의 로또 데이터를 반환하는 메서드입니다.
   *
   * 이 메서드는 `FileReaderService`를 이용해 JSON 파일에서 최신 회차의 데이터를 가져옵니다.
   *
   * @returns {Promise<LottoData>} - 최신 회차의 로또 데이터
   * @throws {Error} - 파일을 읽어오는 데 실패한 경우 에러를 발생시킵니다.
   */
  async getLatestLottoData(): Promise<LottoData> {
    return this.fileReaderService.getLatestLottoData();
  }
}

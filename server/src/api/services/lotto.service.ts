import { Injectable } from "@nestjs/common";
import { FileReaderService } from "./file-reader.service";
import randonNumber from "@shared/utils/numberLogic/randomNumber";

/**
 * LottoService는 고유한 로또 번호 조합을 생성하는 기능을 제공합니다.
 */
@Injectable()
export class LottoService {
  constructor(private readonly fileReaderService: FileReaderService) {}

  /**
   * 중복되지 않는 새로운 로또 번호 조합을 생성합니다.
   *
   * @returns {Promise<number[]>} - 고유한 로또 번호 조합
   */
  async generateUniqueNumbers(): Promise<number[]> {
    const history = await this.fileReaderService.loadHistory();
    let newNumbers: number[];
    do {
      newNumbers = randonNumber();
    } while (history.has(newNumbers.join(",")));
    return newNumbers;
  }
}

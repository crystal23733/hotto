import { Injectable } from "@nestjs/common";
import { LottoService } from "./services/lotto.service";
import { FileReaderService } from "./services/file-reader.service";
import ILottoRoundData from "@shared/interface/lottoRound.interface";

/**
 * ApiService는 API와 관련된 로직을 처리하는 서비스입니다.
 * 로또 번호 조합 생성 및 최신 로또 데이터를 반환하는 기능을 제공합니다.
 */
@Injectable()
export class ApiService {
  constructor(
    private readonly lottoService: LottoService,
    private readonly fileReaderService: FileReaderService,
  ) {}

  /**
   * 고유한 로또 번호 조합을 생성하여 반환합니다.
   *
   * @returns {Promise<number[]>} - 고유한 로또 번호 조합
   */
  async getLottoData(): Promise<number[]> {
    return this.lottoService.generateUniqueNumbers();
  }

  /**
   * 최신 회차의 로또 데이터를 반환합니다.
   *
   * @returns {Promise<ILottoRoundData>} - 최신 회차의 로또 데이터
   */
  async getLatestLottoData(): Promise<ILottoRoundData> {
    return this.fileReaderService.getLatestLottoData();
  }

  /**
   * 특정 회차의 로또 데이터를 반환합니다.
   *
   * @param {string} round - 회차 번호
   * @returns {Promise<ILottoRoundData>} - 특정 회차의 로또 데이터
   */
  async getLottoDataForRound(round: string): Promise<ILottoRoundData> {
    // 파일에서 회차에 맞는 로또 데이터 반환 로직 추가 필요
    return this.fileReaderService.getLottoDataForRound(round);
  }
}

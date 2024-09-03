import { Controller, Get, Param } from "@nestjs/common";
import { ApiService } from "./api.service";
import ILottoRoundData from "../../../shared/interface/lottoRound.interface";

/**
 * ApiController는 API 엔드포인트를 관리하는 컨트롤러입니다.
 * 고유한 로또 번호 조합과 최신 로또 데이터를 제공하는 엔드포인트를 정의합니다.
 */
@Controller("api")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  /**
   * 고유한 로또 번호 조합을 반환하는 엔드포인트입니다.
   *
   * @returns {Promise<number[]>} - 고유한 로또 번호 조합
   */
  @Get("unique-number")
  async getLottoData(): Promise<number[]> {
    return this.apiService.getLottoData();
  }

  /**
   * 최신 회차의 로또 데이터를 반환하는 엔드포인트입니다.
   *
   * @returns {Promise<ILottoRoundData>} - 최신 회차의 로또 데이터
   */
  @Get("latest-numbers")
  async getLatestLottoData(): Promise<ILottoRoundData> {
    return this.apiService.getLatestLottoData();
  }

  /**
   * 특정 회차의 로또 데이터를 반환합니다.
   *
   * @param {string} round - 회차 번호
   * @returns {Promise<ILottoRoundData>} - 로또 데이터
   */
  @Get(":round")
  async getLottoDataRound(
    @Param("round") round: string,
  ): Promise<ILottoRoundData> {
    // 서비스에서 회차에 맞는 데이터 조회 로직 추가 필요
    return this.apiService.getLottoDataForRound(round);
  }
}

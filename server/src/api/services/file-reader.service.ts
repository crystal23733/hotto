import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import LottoData from '@shared/interface/lotto-data.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * FileReaderService는 파일 시스템과 관련된 작업을 처리하는 서비스입니다.
 * 로또 데이터 파일을 읽어오고, 최신 회차의 로또 데이터를 반환하는 기능을 제공합니다.
 */
@Injectable()
export class FileReaderService {
  private readonly historyDir: string;

  /**
   * @param {ConfigService} configService - 환경 변수를 관리하는 서비스
   */
  constructor(private readonly configService: ConfigService) {
    this.historyDir =
      this.configService.get<string>('HISTORY_DIR') ||
      path.resolve('src/assets/history');
  }

  /**
   * 로또 번호의 히스토리를 로드합니다.
   *
   * @returns {Promise<Set<string>>} - 로또 번호 조합의 Set
   * @throws {Error} - 디렉토리를 읽는 중 오류 발생 시 예외를 던집니다.
   */
  async loadHistory(): Promise<Set<string>> {
    const historyData = new Set<string>();
    try {
      const files = await fs.readdir(this.historyDir);
      for (const file of files) {
        const filePath = path.join(this.historyDir, file);
        const data: LottoData = JSON.parse(
          await fs.readFile(filePath, 'utf-8'),
        );
        const numbers: string = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ].join(',');
        historyData.add(numbers);
      }
    } catch (error) {
      console.error('Error reading directory:', error);
      throw error;
    }
    return historyData;
  }

  /**
   * 최신 회차의 로또 데이터를 반환합니다.
   *
   * @returns {Promise<LottoData>} - 최신 회차의 로또 데이터
   * @throws {Error} - 파일을 읽는 중 오류 발생 시 예외를 던집니다.
   */
  async getLatestLottoData(): Promise<LottoData> {
    const files = await fs.readdir(this.historyDir);
    const latestFile = files[files.length - 1];
    const filePath = path.join(this.historyDir, latestFile);
    const data: LottoData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    return data;
  }
}
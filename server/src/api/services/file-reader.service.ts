import {
  GetObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import ILottoRoundData from "@shared/interface/lottoRound.interface";
import { Readable } from "stream";

/**
 * FileReaderService는 로또 당첨번호 데이터를 S3 버킷에서 가져와 
 * 서버 메모리에 캐싱하여 제공하는 서비스입니다.
 * 서버 시작 시 S3 데이터를 비동기로 로드하여 메모리에 저장하고,
 * 이후 요청 시 캐싱된 데이터를 사용하여 응답 속도를 최적화합니다.
 */
@Injectable()
export class FileReaderService implements OnModuleInit {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly prefix: string;
  private memoryCache: Set<string> | null = null; // 로또 번호 조합을 저장하는 메모리 캐시 (null 상태는 초기화가 완료되지 않은 상태)
  private latestLottoData: ILottoRoundData | null = null; // 최신 회차의 로또 데이터 캐시 (초기화가 완료되지 않은 상태)

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>("AWS_REGION"),
    });
    this.bucketName = this.configService.get<string>("HISTORY_BUCKET")!;
    this.prefix = this.configService.get<string>("HISTORY_PREFIX") || "";
  }

  async onModuleInit() {
    // 비동기로 S3 데이터를 로드하여 메모리에 캐시
    this.loadHistory();
  }

  /**
   * S3 버킷에서 모든 로또 히스토리를 비동기로 로드하여 메모리 캐시에 저장합니다.
   */
  private async loadHistory(): Promise<void> {
    const command = new ListObjectsCommand({
      Bucket: this.bucketName,
      Prefix: this.prefix,
    });

    try {
      const historyData = new Set<string>();
      const { Contents } = await this.s3Client.send(command);
      if (!Contents) {
        this.memoryCache = historyData; // 비어 있는 경우 빈 캐시로 초기화
        return;
      }

      const numberedFiles = Contents.map((content) => ({
        key: content.Key!,
        number: parseInt(content.Key!.replace(/[^0-9]/g, ""), 10),
      }))
        .filter((file) => !isNaN(file.number))
        .sort((a, b) => b.number - a.number);

      for (const content of numberedFiles) {
        const data: ILottoRoundData = await this.readJsonFromS3(content.key);
        const numbers = [
          data.drwtNo1,
          data.drwtNo2,
          data.drwtNo3,
          data.drwtNo4,
          data.drwtNo5,
          data.drwtNo6,
        ].join(",");
        historyData.add(numbers);

        if (!this.latestLottoData) {
          this.latestLottoData = data;
        }
      }

      this.memoryCache = historyData;
    } catch (error) {
      console.error("Error loading history from S3:", error);
      throw error;
    }
  }

  /**
   * 메모리에 캐싱된 로또 히스토리 데이터를 반환합니다.
   * 캐시가 초기화되지 않았을 경우, S3에서 직접 데이터를 로드합니다.
   * @returns {Promise<Set<string>>} - 메모리에 저장된 로또 번호 조합의 Set
   */
  async getCachedHistory(): Promise<Set<string>> {
    if (!this.memoryCache) {
      await this.loadHistory(); // 캐시가 없으면 S3에서 로드
    }
    return this.memoryCache!;
  }

  /**
   * 최신 회차의 로또 데이터를 반환합니다.
   * 캐시가 초기화되지 않았을 경우, S3에서 직접 데이터를 로드합니다.
   * @returns {Promise<ILottoRoundData>} - 최신 회차의 로또 데이터
   */
  async getLatestLottoData(): Promise<ILottoRoundData> {
    if (!this.latestLottoData) {
      await this.loadHistory(); // 최신 데이터가 없으면 S3에서 로드
    }
    return this.latestLottoData!;
  }

  /**
   * S3에서 특정 회차의 로또 데이터를 반환합니다.
   * @param {string} round - 조회할 회차 번호
   * @returns {Promise<ILottoRoundData>} - 특정 회차의 로또 데이터
   */
  async getLottoDataForRound(round: string): Promise<ILottoRoundData> {
    const key = `${this.prefix}/${round}.json`;
    try {
      return await this.readJsonFromS3(key);
    } catch (error) {
      console.error("Error reading lotto data for round from S3:", error);
      throw error;
    }
  }

  /**
   * S3에서 특정 키의 JSON 객체를 읽어옵니다.
   */
  private async readJsonFromS3(key: string): Promise<ILottoRoundData> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    const response = await this.s3Client.send(command);
    const stream = response.Body as Readable;
    const data = await new Promise<string>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      stream.on("error", reject);
    });

    return JSON.parse(data);
  }
}

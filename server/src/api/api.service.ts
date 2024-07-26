import { Injectable } from "@nestjs/common";
import generateUniqueNumbers from "./modules/generateUniqueNumbers";

@Injectable()
export class ApiService {
  async getLottoData(): Promise<number[]> {
    return generateUniqueNumbers();
  }
}

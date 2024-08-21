import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { FileReaderService } from "./services/file-reader.service";
import { LottoService } from "./services/lotto.service";

@Module({
  controllers: [ApiController],
  providers: [ApiService, FileReaderService, LottoService],
})
export class ApiModule {}

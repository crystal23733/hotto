import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { ApiService } from "./api.service";
import { FileReaderService } from "./services/file-reader.service";

@Module({
  controllers: [ApiController],
  providers: [ApiService, FileReaderService],
})
export class ApiModule {}

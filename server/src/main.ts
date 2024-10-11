import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const PEM_URL = process.env.PEM_URL as string;
  const PEM_KEY_URL = process.env.PEM_KEY_URL as string;

  // HTTPS 옵션 설정 (개발 환경에서만)
  const httpsOptions = isDevelopment
    ? {
        key: fs.readFileSync(path.join(PEM_KEY_URL)),
        cert: fs.readFileSync(path.join(PEM_URL)),
      }
    : null;

  const app = await NestFactory.create(AppModule, {
    ...(httpsOptions && { httpsOptions }),
  });

  // ! 환경변수 관리를 위한 설정
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT") || 3000;

  // CORS 설정
  const CLIENT_URL = configService.get<string>("CLIENT_URL");
  app.enableCors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  await app.listen(PORT);
  console.log(
    `Server running on ${isDevelopment ? "https" : "http"}://localhost:${PORT}`,
  );
}
bootstrap();

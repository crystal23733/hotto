import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT") || 3000;

  // CORS 설정
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  // 로깅 미들웨어 설정
  app.use(morgan("dev"));

  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();

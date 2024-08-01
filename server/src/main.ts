import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! 환경변수 관리를 위한 설정
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT") || 3000;

  // CORS 설정
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();

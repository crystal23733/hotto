import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ! 환경변수 관리를 위한 설정
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>("PORT") || 3000;
  const DB_Url = configService.get<string>("DB_URL");
  const cookieSecretKey = configService.get<string>("SECRET_KEY")!;
  const cookieAge = configService.get<number>("SECRET_AGE") || 86400000;

  // * 쿠키를 파싱하기 위한 미들웨어
  app.use(cookieParser());
  // * express를 위한 미들웨어
  // todo 추후 https 인증 secure:true 추가 필요
  app.use(
    session({
      secret: cookieSecretKey,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: cookieAge,
        sameSite: "strict",
      },
      store: MongoStore.create({
        mongoUrl: DB_Url,
        collectionName: "sessions",
      }),
    }),
  );

  // CORS 설정
  app.enableCors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  });

  // 로깅 미들웨어 설정
  app.use(morgan("dev"));

  await app.listen(PORT);
  console.log(`http://localhost:${PORT}`);
}
bootstrap();

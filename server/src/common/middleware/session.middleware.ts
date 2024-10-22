import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: (error?: Error | any) => void) {
    // * 환경에 따른 secure 설정
    const isProduction = process.env.NODE_ENV === "production";
    const cookieDomain = isProduction
      ? this.configService.get<string>("COOKIE_DOMAIN")
      : undefined;
    cookieParser()(req, res, (cookieErr) => {
      if (cookieErr) {
        return next(cookieErr);
      }
      const DB_URL = this.configService.get<string>("DB_URL")!;
      session({
        secret: this.configService.get<string>("SECRET_KEY")!,
        resave: false,
        saveUninitialized: false,
        name: "LIN_HOTTO",
        cookie: {
          httpOnly: true,
          domain: cookieDomain,
          maxAge:
            Number(this.configService.get<number>("SECRET_AGE")) || 86400000,
          sameSite: isProduction ? "none" : "strict",
          secure: isProduction,
        },
        store: MongoStore.create({
          mongoUrl: DB_URL,
          collectionName: "sessions",
          autoRemove: "native", // MongoDB의 TTL 인덱스 사용
          touchAfter: 24 * 3600, // 24시간마다 세션 업데이트
        }),
        proxy: isProduction,
      })(req, res, (sessionErr) => {
        if (sessionErr) {
          console.error("Session middleware 에러:", sessionErr);
          return next(sessionErr);
        }

        next();
      });
    });
  }
}

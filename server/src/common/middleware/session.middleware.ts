import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: any, res: any, next: (error?: Error | any) => void) {
    cookieParser()(req, res, (err) => {
      if (err) {
        return next(err);
      }
      session({
        secret: this.configService.get<string>("SECRET_KEY")!,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          maxAge: this.configService.get<number>("SECRET_AGE") || 86400000,
          sameSite: "strict",
        },
        store: MongoStore.create({
          mongoUrl: this.configService.get<string>("DB_URL"),
          collectionName: "sessions",
        }),
      })(req, res, next);
    });
  }
}

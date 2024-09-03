import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/model/user.schema";
import { Model } from "mongoose";
import { conditional } from "@shared/pipes/condition";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import userDto from "../pipe/dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    if (!conditional.emailCon(email)) {
      throw new UnauthorizedException("이메일 형식이 유효하지 않습니다.");
    }

    if (!conditional.passwordLength(password)) {
      throw new UnauthorizedException("비밀번호가 너무 짧습니다.");
    }

    const user = await this.userModel.findOne({ email }).exec();
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        "이메일 또는 비밀번호가 올바르지 않습니다.",
      );
    }
    return user;
  }

  async getAuthStatus(
    req: any,
  ): Promise<{ isAuthenticated: boolean; user?: userDto }> {
    if (req.session && req.session.userId) {
      // userId로 확인
      const user = await this.userModel.findById(req.session.userId).exec();
      if (user) {
        return {
          isAuthenticated: true,
          user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          },
        };
      }
    }
    return { isAuthenticated: false };
  }

  async logout(req: any, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(err);
        }
        // 환경에 따라 domain 설정
        const isProduction = process.env.NODE_ENV === "production";
        // 환경 변수에서 설정값을 가져옴
        const cookieDomain = isProduction
          ? this.configService.get<string>("COOKIE_DOMAIN")
          : undefined;

        // 쿠키 삭제 시 도메인, 경로, secure 옵션을 명시적으로 설정
        res.clearCookie("LIN_HOTTO", {
          domain: cookieDomain, // 쿠키 생성 시 설정한 도메인
          path: "/", // 기본 경로
          secure: isProduction, // 환경변수에 따라 secure 설정
          sameSite: isProduction ? "none" : "strict", // 환경변수에 따라 sameSite 설정
        });
        resolve();
      });
    });
  }
}

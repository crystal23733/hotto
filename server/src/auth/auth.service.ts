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
            balance: user.balance,
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

  /**
   * 사용자가 입력한 비밀번호를 검증하는 메서드입니다.
   * @param {string} userId - 세션에서 가져온 사용자 ID
   * @param {string} password - 사용자가 입력한 비밀번호
   * @returns {Promise<{ success: boolean; message?: string }>} - 비밀번호 검증 결과를 반환합니다.
   * @throws {UnauthorizedException} - 사용자가 존재하지 않을 경우 예외를 발생시킵니다.
   */
  async verifyPassword(
    userId: string,
    password: string,
  ): Promise<{ success: boolean; message?: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "비밀번호가 일치하지 않습니다." };
    }
    return { success: true };
  }

  /**
   * 비밀번호를 변경하는 메서드입니다.
   * @param {string} userId - 세션에서 가져온 사용자 ID
   * @param {string} oldPassword - 기존에 사용중이던 비밀번호
   * @param {string} changePassword - 변경할 비밀번호
   * @param {string} changePasswordConfirm - 변경할 비밀번호 확인
   * @returns {Promise<{success: boolean, message?: string}>}  - 비밀번호 변경 여부에 따른 검증 결과를 반환합니다.
   */
  async changePassword(
    userId: string,
    oldPassword: string,
    changePassword: string,
    changePasswordConfirm: string,
  ): Promise<{ success: boolean; message?: string }> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException("사용자를 찾을 수 없습니다.");
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (
      !conditional.passwordLength(changePassword) ||
      !conditional.passwordLength(changePasswordConfirm)
    ) {
      return { success: false, message: "비밀번호가 너무 짧습니다." };
    }

    if (!isPasswordValid) {
      return { success: false, message: "기존 비밀번호가 일치하지 않습니다." };
    }

    if (changePassword !== changePasswordConfirm) {
      return {
        success: false,
        message: "변경할 비밀번호가 일치하지 않습니다.",
      };
    }

    user.password = changePassword;
    await user.save();

    return { success: true, message: "비밀번호가 성공적으로 변경되었습니다." };
  }
}

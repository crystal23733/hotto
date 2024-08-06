import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/model/user.schema";
import { Model } from "mongoose";
import { conditional } from "@shared/pipes/condition";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
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
  ): Promise<{ isAuthenticated: boolean; user?: any }> {
    console.log("Session:", req.session); // 세션 내용 로깅
    if (req.session && req.session.userId) {
      // userId로 확인
      const user = await this.userModel.findById(req.session.userId).exec();
      if (user) {
        console.log("Authenticated user:", user);
        return { isAuthenticated: true, user: user };
      }
    }
    console.log("Not authenticated");
    return { isAuthenticated: false };
  }

  async logout(req: any, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(err);
        }
        res.clearCookie("connect.sid");
        resolve();
      });
    });
  }
}

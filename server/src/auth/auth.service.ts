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
}

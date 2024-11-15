import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { conditional } from "@shared/pipes/condition";
import { User } from "../database/model/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RootService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async handleJoin(body) {
    const { name, email, password, checkPassword, phone } = body;

    // 이메일 유효성 검사
    if (!conditional.emailCon(email)) {
      return { error: "이메일 양식이 유효하지 않습니다." };
    }

    // 비밀번호 확인
    if (password !== checkPassword) {
      return { error: "비밀번호가 동일하지 않습니다." };
    }

    // 중복 계정 검사
    const existsName = await this.userModel.exists({ name });
    const existsEmail = await this.userModel.exists({ email });

    if (existsName) {
      return { error: "아이디가 이미 존재합니다." };
    }
    if (existsEmail) {
      return { error: "이메일이 이미 존재합니다." };
    }

    // 사용자 생성
    try {
      await this.userModel.create({ name, email, password, phone });
      return { message: "User created successfully" };
    } catch (error) {
      throw new HttpException(
        "회원가입 중 오류가 발생했습니다.",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

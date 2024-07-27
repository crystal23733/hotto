import { Injectable } from "@nestjs/common";
import { conditional } from "@shared/pipes/joinCondition";
import { User } from "../database/model/user.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RootService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async handleJoin(body) {
    const { name, email, password, checkPassword, phone } = body;
    if (!conditional.emailCon(email)) {
      return { error: "이메일 양식이 유효하지 않습니다." };
    }
    if (password !== checkPassword) {
      return { error: "비밀번호가 동일하지 않습니다." };
    }
    if (!conditional.phoneCon(phone)) {
      return { error: "전화번호 양식이 유효하지 않습니다." };
    }
    const existsName = await this.userModel.exists({ name }); // 사용자 이름 존재 확인
    const existsEmail = await this.userModel.exists({ email }); // 이메일 존재 확인
    const existsPhone = await this.userModel.exists({ phone }); // 전화번호 존재 확인
    try {
      await this.userModel.create({ name, email, password, phone }); // 새 사용자 생성
      return { message: "User created successfully" };
    } catch (error) {
      if (existsName) return { error: "아이디가 이미 존재합니다." };
      if (existsEmail) return { error: "이메일이 이미 존재합니다." };
      if (existsPhone) return { error: "전화번호가 이미 존재합니다." };
    }
  }
}

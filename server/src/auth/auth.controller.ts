import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post("login")
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.login(email, password);
      req.session.userId = user._id.toString();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(
          "로그인 실패: " + error.message,
          HttpStatus.UNAUTHORIZED,
        );
      } else {
        // Handle other types of errors if needed
        throw new HttpException(
          "로그인 실패: 알 수 없는 오류가 발생했습니다.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}

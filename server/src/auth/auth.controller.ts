import {
  Body,
  Controller,
  Get,
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
  constructor(private readonly authService: AuthService) {}
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

  @Get("status")
  async getAuthStatus(@Req() req: Request, @Res() res: Response) {
    const status = await this.authService.getAuthStatus(req);
    return res.json(status);
  }

  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.logout(req, res);
      return res.json({ message: "로그아웃 성공" });
    } catch (error) {
      return res.status(500).json({ message: "로그아웃 실패" });
    }
  }
}

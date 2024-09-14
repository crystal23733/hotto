import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
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

  /**
   * 사용자가 입력한 비밀번호를 검증하는 API 엔드포인트입니다.
   * @param {string} password - 사용자가 입력한 비밀번호
   * @param {Request} req - Express 요청 객체 (세션을 포함)
   * @param {Response} res - Express 응답 객체
   * @returns {Promise<Response>} - 비밀번호 검증 결과를 응답합니다.
   * @throws {UnauthorizedException} - 세션이 만료되었거나 존재하지 않을 경우 예외를 발생시킵니다.
   */
  @Post("verify-password")
  async verifyPassword(
    @Body("password") password: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = req.session.userId;
      if (!userId) {
        throw new UnauthorizedException(
          "세션이 만료되었거나 존재하지 않습니다.",
        );
      }
      const result = await this.authService.verifyPassword(userId, password);
      if (result.success) {
        return res.status(HttpStatus.OK).json({ success: true });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: result.message });
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: error.message });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "비밀번호 검사중 알 수 없는 오류가 발생하였습니다.",
        });
      }
    }
  }

  /**
   * 사용자 비밀번호를 변경하는 엔드포인트입니다.
   * @param {string} oldPassword - 사용자가 입력한 기존 비밀번호
   * @param  {string} changePassword - 사용자가 입력한 변경할 비밀번호
   * @param  {string} changePasswordConfirm - 사용자가 입력한 변경할 비밀번호 재확인
   * @param {Request} req - Express 요청 객체 (세션을 포함)
   * @param {Response} res - Express 응답 객체
   * @returns {Promise<Response>} - 비밀번호 변경 결과를 응답합니다.
   * @throws {UnauthorizedException} - 세션이 만료되었거나 존재하지 않을 경우 예외를 발생시킵니다.
   */
  @Put("change-password")
  async changePasswordController(
    @Body("oldPassword") oldPassword: string,
    @Body("changePassword") changePassword: string,
    @Body("changePasswordConfirm") changePasswordConfirm,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const userId = req.session.userId;
      if (!userId) {
        throw new UnauthorizedException(
          "세션이 만료되었거나 존재하지 않습니다.",
        );
      }
      const result = await this.authService.changePassword(
        userId,
        oldPassword,
        changePassword,
        changePasswordConfirm,
      );
      if (result.success) {
        return res.status(HttpStatus.OK).json({ success: true });
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: result.message });
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: error.message });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "비밀번호 검사중 알 수 없는 오류가 발생하였습니다.",
        });
      }
    }
  }
}

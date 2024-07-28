import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common"; // 필요한 데코레이터를 가져옵니다.
import { RootService } from "./root.service"; // RootService를 가져옵니다.

@Controller() // 기본 경로를 설정하지 않으면 기본 루트 '/'로 설정됩니다.
export class RootController {
  constructor(private readonly rootService: RootService) {} // RootService를 의존성 주입으로 가져옵니다.

  @Post("/join") // '/join' 경로의 POST 요청을 처리합니다.
  @HttpCode(HttpStatus.CREATED) // 응답 상태 코드를 201로 설정합니다.
  async postJoin(@Body() body) {
    return await this.rootService.handleJoin(body); // 요청 본문을 처리하여 결과를 반환합니다.
  }
}

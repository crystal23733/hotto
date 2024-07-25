import { Controller, Get } from "@nestjs/common";

@Controller("/api")
export class ApiController {
  @Get("lotto-data")
  getStatus() {
    return { message: "API working" };
  }
}

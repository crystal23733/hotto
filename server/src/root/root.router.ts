import { Module } from '@nestjs/common'; // Nest의 모듈 데코레이터를 가져옵니다.
import { RootController } from './root.controller'; // RootController를 가져옵니다. 루트 경로 관련 요청을 처리합니다.
import { RootService } from './root.service'; // RootService를 가져옵니다. 비즈니스 로직을 처리합니다.

@Module({
  controllers: [RootController], // 컨트롤러를 등록합니다.
  providers: [RootService], // 서비스(비즈니스 로직)를 등록합니다.
})
export class RootModule {} // 루트 관련 모듈을 정의합니다.
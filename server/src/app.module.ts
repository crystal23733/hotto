import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { RootModule } from "./root/root.module";
import { ApiModule } from "./api/api.module";
import { SessionMiddleware } from "./common/middleware/session.middleware";
import { AuthModul } from "./login/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("DB_URL")!,
      }),
      inject: [ConfigService],
    }),
    RootModule,
    ApiModule,
    AuthModul,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}

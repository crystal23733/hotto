import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { RootModule } from "./root/root.router";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL')!,
      }),
      inject: [ConfigService],
    }),
    RootModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

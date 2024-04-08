import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AnalyserModule } from './analyser/analyser.module';
import { CronService } from './app.cron.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    FileModule,
    AuthModule,
    AnalyserModule,
  ],
  controllers: [AppController],
  providers: [AppService, CronService],
})
export class AppModule {}

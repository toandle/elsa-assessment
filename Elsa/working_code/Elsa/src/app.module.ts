import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import  {configService } from './configs/db.config'
import { QuizModule } from './modules/quiz/quiz.module';
import { LoggerModule } from 'nestjs-pino';
import { getLoggerConfig } from './configs/logger.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getDBConfig()),
    LoggerModule.forRootAsync(getLoggerConfig()),
    QuizModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { QuizAnswer } from 'src/entities/quiz-answer.model';
import { QuizQuestion } from 'src/entities/quiz-question.model';
import { Quiz } from 'src/entities/quiz.model';
import { UserQuizAnswer } from 'src/entities/user-quiz-answer.model';
import { UserQuiz } from 'src/entities/user-quiz.model';
import { User } from 'src/entities/user.model';
config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getDBConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      entities: [User, UserQuiz, UserQuizAnswer, Quiz, QuizQuestion, QuizAnswer],
      migrationsTableName: 'migration',
      migrations: ['src/migrations/*.ts'],
      ssl: false,
      synchronize: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
]);

export { configService };

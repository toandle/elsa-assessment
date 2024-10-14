import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { Quiz } from 'src/entities/quiz.model';
import { QuizQuestion } from 'src/entities/quiz-question.model';
import { QuizAnswer } from 'src/entities/quiz-answer.model';
import { UserQuiz } from 'src/entities/user-quiz.model';
import { User } from 'src/entities/user.model';
import { UserQuizAnswer } from 'src/entities/user-quiz-answer.model';
import { UserQuizController } from './controllers/user-quiz.controller';
import { UserQuizService } from './services/user-quiz.service';


@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizQuestion, QuizAnswer, User, UserQuiz, UserQuizAnswer])],
  providers: [QuizService, UserQuizService],
  controllers: [QuizController, UserQuizController],
  exports: [QuizService, UserQuizService, TypeOrmModule]
})
export class QuizModule {}
import { QuizAnswer } from 'src/entities/quiz-answer.model';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { QuizQuestion } from './quiz-question.model';
import { UserQuiz } from './user-quiz.model';


@Entity({ name:'user_quiz_answer' })
export class UserQuizAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserQuiz, (userQuiz) => userQuiz.userAnswers)
  @JoinColumn({ name: 'user_quiz_id' })
  userQuiz: UserQuiz;

  @ManyToOne(() => QuizQuestion, (quiz) => quiz.userAnswers)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion;

  @ManyToOne(() => QuizAnswer, (quiz) => quiz.userAnswers)
  @JoinColumn({ name: 'answer_id' })
  answer: QuizAnswer;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


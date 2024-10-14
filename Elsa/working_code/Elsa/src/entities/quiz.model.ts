import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { QuizQuestion } from './quiz-question.model';
import { UserQuiz } from './user-quiz.model';


@Entity({ name:'quiz' })
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  title: string

  @Column({ nullable: false, type: 'text' })
  summary: string

  @Column({ nullable: false, type: 'text' })
  content: string

  @Column({ nullable: false, type: 'smallint' })
  score: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @OneToMany(() => QuizQuestion, (quizQuestionEntity) => quizQuestionEntity.quiz, {
    cascade: true,
    eager: true,
  })
  questions: QuizQuestion[];

  @OneToMany(() => UserQuiz, (userQuiz) => userQuiz.quiz, {
    cascade: true,
    eager: false,
  })
  userQuizs: UserQuiz[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


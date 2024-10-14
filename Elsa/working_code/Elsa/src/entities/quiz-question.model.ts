import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { QuizAnswer } from './quiz-answer.model';
import { Quiz } from './quiz.model';
import { UserQuizAnswer } from './user-quiz-answer.model';


@Entity({ name:'quiz_question' })
export class QuizQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz

  @OneToMany(() => QuizAnswer, (answer) => answer.question, {
    cascade: true,
    eager: true,
  })
  answers: QuizAnswer[]

  @OneToMany(() => UserQuizAnswer, (userAnser) => userAnser.answer, {
    cascade: true,
    eager: false,
  })
  userAnswers: UserQuizAnswer[];

  @Column({ nullable: false, type: 'text' })
  content: string

  @Column({ type: 'smallint' })
  score: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


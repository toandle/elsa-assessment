import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { QuizQuestion } from './quiz-question.model';
import { UserQuizAnswer } from './user-quiz-answer.model';



@Entity({ name:'quiz_answer' })
export class QuizAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => QuizQuestion, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: QuizQuestion

  @OneToMany(() => UserQuizAnswer, (userAnser) => userAnser.answer, {
    cascade: true,
    eager: false,
  })
  userAnswers: UserQuizAnswer[];

  @Column({ nullable: false, type: 'text' })
  content: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @Column({ name: 'is_correct' })
  isCorrect: boolean
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}


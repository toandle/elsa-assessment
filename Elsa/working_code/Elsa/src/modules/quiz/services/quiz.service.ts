import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.model';
import { UserQuiz } from 'src/entities/user-quiz.model';
import { Repository } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(UserQuiz) private readonly userQuizRepository: Repository<UserQuiz>,
  ) {}

  public async getQuizList(pageSize: number = 50, pageNumber: number = 0) {
    const skip = (pageNumber - 1) * pageSize
    return this.quizRepository.createQueryBuilder('quiz')
    .skip(skip)
    .take(pageSize)
    .select(['quiz.id', 'quiz.summary', 'quiz.content', 'quiz.score'])
    .getMany();
  }

  public async getQuizById(id: string) {
    return this.quizRepository.findOne({ where: { id } });
  }

  public async getLeaderBoard(quizId: string) {
    const queryResult = await this.userQuizRepository
    .createQueryBuilder('userQuiz')
    .leftJoinAndSelect('userQuiz.quiz', 'quiz')
    .leftJoinAndSelect('userQuiz.user', 'user')
    .where('quiz.id = :quizId')
    .distinctOn(['user.id'])
    .orderBy({'user.id': 'DESC', 'userQuiz.score': 'DESC'})
    .take(5)
    .setParameters({ quizId: quizId })
    .select(['userQuiz.id', 'user.id', 'user.firstName', 'user.lastName', 'user.profileUrl', 'userQuiz.score'])
    .getMany();

    return queryResult.map((r) => {
      return {
        id: r.user.id,
        firstName: r.user.firstName,
        lastName: r.user.lastName,
        profileUrl: r.user.profileUrl,
        score: r.score
      }
    });
  }
}
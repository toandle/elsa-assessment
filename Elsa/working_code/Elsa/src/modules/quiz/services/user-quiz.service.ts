import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chain, keyBy } from 'lodash';
import { Quiz } from 'src/entities/quiz.model';
import { UserQuizAnswer } from 'src/entities/user-quiz-answer.model';
import { UserQuiz } from 'src/entities/user-quiz.model';
import { User } from 'src/entities/user.model';
import { Repository } from 'typeorm';
import { UserQuizDto } from '../dto/user-quiz.dto';

@Injectable()
export class UserQuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(UserQuiz) private readonly userQuizRepository: Repository<UserQuiz>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}
  
  public async submitQuiz(userQuizDto: UserQuizDto) {
    const [user, quiz] = await Promise.all([
      this.userRepository.findOne({ where: { id: userQuizDto.userId } }),
      this.quizRepository.findOne({ where: { id: userQuizDto.quizId } })
    ]);

    const questionMap = keyBy(quiz.questions, 'id');
    const answerMap = chain(quiz.questions)
    .map((question) => question.answers)
    .flatten()
    .keyBy('id')
    .value();

    const entity = new UserQuiz();
    entity.quiz = quiz;
    entity.user = user;
    let score = 0;
    entity.userAnswers = userQuizDto.submissions.map((summission) => {
      const answer = answerMap[summission.answerId];
      const question = questionMap[summission.questionId];
      const userQuizAnswer = new UserQuizAnswer();
      userQuizAnswer.question = question;
      
      userQuizAnswer.answer = answer;

      if (answer.isCorrect) {
        score += question.score;
      }

      return userQuizAnswer;
    });
    entity.score = score
    await this.userQuizRepository.save(entity)

    return true
  }
}
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserQuizDto } from '../dto/user-quiz.dto';
import { UserQuizService } from '../services/user-quiz.service';

@Controller('/v1/quiz')
export class UserQuizController {
  constructor (private readonly userQuizService: UserQuizService) {}

  @Post('/submit')
  @ApiTags('Quiz')
  async submitQuiz(@Body() userQuizDto: UserQuizDto) {
    return this.userQuizService.submitQuiz(userQuizDto);
  }
}
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizService } from '../services/quiz.service';

@Controller('/v1/quiz')
export class QuizController {
  constructor (private readonly quizService: QuizService) {}

  @Get()
  @ApiTags('Quiz')
  public async getQuizList(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return this.quizService.getQuizList(pageSize, pageNumber);
  }

  @Get(':id')
  @ApiTags('Quiz')
  public async getQuiz(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Get(':quizId/leader-board')
  @ApiTags('Quiz')
  public async getLeaderBoard(@Param('quizId') id: string) {
    return this.quizService.getLeaderBoard(id);
  }
}
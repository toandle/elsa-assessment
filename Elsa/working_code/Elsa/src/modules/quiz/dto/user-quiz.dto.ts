import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserSubmissionDto {
  @ApiProperty({ required: true, example: '60700de7-6e89-4d97-9cdf-2d77f7114aa6' })
  @IsNotEmpty()
  questionId: string;

  @ApiProperty({ required: true, example: 'fa6f707e-ce4f-4c9d-b26c-cfb7fee78ba5' })
  @IsNotEmpty()
  answerId: string;
}

@ApiExtraModels(UserSubmissionDto)
export class UserQuizDto {
  @ApiProperty({ required: true, example: 'd9b33fbd-9a2c-44fd-af5c-eb1ddaa0a467' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ required: true, example: '91a9a438-2f01-4794-a1c9-48cf4582f0f5' })
  @IsNotEmpty()
  quizId: string;

  @ApiProperty({ required: true, type: [UserSubmissionDto] })
  submissions: UserSubmissionDto[];
}

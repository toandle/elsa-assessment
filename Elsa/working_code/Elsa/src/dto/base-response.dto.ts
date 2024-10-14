import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  constructor(code: string, message = '') {
    this.code = code;
    this.message = message;
  }

  @ApiProperty({ required: false, example: 1001 })
  code: string;

  @ApiProperty({ required: false, example: 'Failed to load configs' })
  message: string;
}

export class BaseResponseDto<T> {
  constructor(successful = true, data: T = null, error: ErrorResponseDto = null) {
    this.status = successful;
    this.error = error;
    this.data = data;
  }

  @ApiProperty({
    description: 'true if user the API was exxecuted successfully',
  })
  status: boolean;

  @ApiProperty({ required: false })
  error: ErrorResponseDto;

  @ApiProperty({
    required: false,
    description: 'data could be array, object or anything',
  })
  data: T;
}

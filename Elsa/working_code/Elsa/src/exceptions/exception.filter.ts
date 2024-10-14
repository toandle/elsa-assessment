import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { UNKNOWN_ERROR } from './error-code';
import { ErrorResponseDto, BaseResponseDto } from '../dto/base-response.dto';
import { ApiException } from './api-exception';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception['message'];
    const code = exception instanceof ApiException ? exception.code : UNKNOWN_ERROR;

    const responseDto = new BaseResponseDto<any>(false);
    responseDto.error = new ErrorResponseDto(code, message);

    this.logger.error(message);

    response.status(status).json(responseDto);
  }
}

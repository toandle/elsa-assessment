import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiException extends HttpException {
  code: string;

  constructor(code: string, message: string) {
    super(message, HttpStatus.OK);
    this.code = code;
  }
}

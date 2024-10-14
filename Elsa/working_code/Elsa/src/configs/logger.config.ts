import { RequestMethod } from '@nestjs/common';
import { config } from 'dotenv';
import { LoggerModuleAsyncParams } from 'nestjs-pino';

config();

export function getLoggerConfig(): LoggerModuleAsyncParams {
  return {
    useFactory: () => ({
      pinoHttp: {
        name: 'elsa-assessment',
        level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
      },
      renameContext: 'appContext',
      exclude: [{ method: RequestMethod.ALL, path: 'health' }],
    }),
  };
}
import pino from 'pino';
import { env } from '../config/env.js';

export const logger = pino({
    level: env.LOG_LEVEL ?? 'info',


    transport: env.NODE_ENV === 'development'
        ? { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss.l' } }
        : undefined,

    redact: {
        paths: ['req.headers.authorization', 'apiKey', '*.password'],
        censor: '[REDACTED]',
    },

    serializers: {
        err: pino.stdSerializers.err,
    },
});
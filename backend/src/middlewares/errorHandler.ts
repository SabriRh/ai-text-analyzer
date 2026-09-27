import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';


export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    const reqLogger = logger.child({
        method: req.method,
        url: req.originalUrl,
    });

    // Cas 1 — Erreur de validation Zod
    if (err instanceof ZodError) {
        reqLogger.warn({ err }, 'Validation error');
        res.status(400).json({
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: err.flatten().fieldErrors,
        });
        return;
    }

    // Cas 2 — Erreur métier (AppError et sous-classes)
    if (err instanceof AppError) {
        if (err.isOperational) {
            reqLogger.warn({ err, code: err.code }, 'Operational error');
        } else {
            reqLogger.error({ err, code: err.code }, 'Non-operational AppError');
        }

        res.status(err.statusCode).json({
            error: err.message,
            code: err.code,
        });
        return;
    }

    // Cas 3 — Erreur inattendue (bug)
    reqLogger.error({ err }, 'Unhandled error');

    res.status(500).json({
        error: 'Internal server error',
        code: 'INTERNAL_ERROR',
    });
};
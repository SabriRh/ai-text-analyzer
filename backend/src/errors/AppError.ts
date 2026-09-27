export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number, code: string, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * 400 — La requête est invalide (body mal formé, champ manquant...).
 */
export class ValidationError extends AppError {
    constructor(message = 'Validation failed', details?: unknown) {
        super(message, 400, 'VALIDATION_ERROR');
        if (details) {
            (this as { details?: unknown }).details = details;
        }
    }
}

/**
 * 404 — Ressource introuvable.
 */
export class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message, 404, 'NOT_FOUND');
    }
}

/**
 * 502 — Le service (Ollama) a renvoyé une erreur.
 */
export class UpstreamError extends AppError {
    constructor(message = 'Upstream service error', details?: unknown) {
        super(message, 502, 'UPSTREAM_ERROR');
        if (details) {
            (this as { details?: unknown }).details = details;
        }
    }
}

/**
 * 504 — Le service n'a pas répondu à temps.
 */
export class TimeoutError extends AppError {
    constructor(message = 'Upstream timeout') {
        super(message, 504, 'TIMEOUT');
    }
}
import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { ZodError } from 'zod';


export function validateBody<T>(schema: ZodType<T>): RequestHandler {
    return (req, _res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            next(result.error);
            return;
        }

        // On remplace req.body par la version validée et transformée
        req.body = result.data;
        next();
    };
}
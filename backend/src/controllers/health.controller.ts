import type { Request, Response } from 'express';
import { getSystemHealth } from '../services/health.service.js';
import { logger } from '../utils/logger.js';
import type { HealthResponse } from '../models/health.model.js';

export async function getHealth(_req: Request, res: Response<HealthResponse>) {
    const response = await getSystemHealth();

    logger.debug(
        {
            status: response.status,
            ollamaAvailable: response.services.ollama.available,
            defaultModelAvailable: response.services.ollama.defaultModelAvailable,
        },
        'Health check performed'
    );

    res.status(200).json(response);
}
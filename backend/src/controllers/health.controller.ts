import type { Request, Response } from 'express';
import { checkOllamaHealth } from '../services/ollama.service.js';
import { logger } from '../utils/logger.js';
import type { HealthResponse } from '../models/health.model.js';

export async function getHealth(_req: Request, res: Response<HealthResponse>) {
    const ollamaHealth = await checkOllamaHealth();

    const status: HealthResponse['status'] = ollamaHealth.available ? 'ok' : 'ko';

    const response: HealthResponse = {
        status,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
            ollama: ollamaHealth,
        },
    };

    logger.debug(
        { status, ollamaAvailable: ollamaHealth.available },
        'Health check performed'
    );

    res.status(200).json(response);
}
import { checkOllamaHealth } from './ollama.service.js';
import type { HealthResponse } from '../models/health.model.js';

export async function getSystemHealth(): Promise<HealthResponse> {
    const ollamaHealth = await checkOllamaHealth();

    const isHealthy =
        ollamaHealth.available && ollamaHealth.defaultModelAvailable === true;

    return {
        status: isHealthy ? 'ok' : 'ko',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        services: {
            ollama: ollamaHealth,
        },
    };
}
interface OllamaHealth {
    available: boolean;
    latencyMs?: number;
    models?: string[];
    error?: string;
}

export interface HealthResponse {
    status: 'ok' | 'degraded' | 'ko';
    timestamp: string;
    services: {
        ollama: OllamaHealth;
    };
}
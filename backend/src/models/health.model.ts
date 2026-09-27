export interface OllamaHealth {
    available: boolean;
    latencyMs?: number;
    models?: string[];
    error?: string;
}

export interface HealthResponse {
    status: 'ok' | 'ko';
    timestamp: string;
    uptime: number;
    services: {
        ollama: OllamaHealth;
    };
}
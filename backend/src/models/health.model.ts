export interface OllamaHealth {
    available: boolean
    latencyMs?: number
    models?: string[]
    error?: string
}
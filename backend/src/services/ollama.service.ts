import OpenAI from 'openai';
import { env } from '../config/env.js';
import { OllamaHealth } from '../models/health.model.js';

/**
 * Client OpenAI SDK configuré pour Ollama.
 * Ollama expose une API compatible OpenAI sur /v1.
 */
export const ollamaClient = new OpenAI({
  baseURL: env.OLLAMA_URL,
  apiKey: env.OLLAMA_API_KEY,
  timeout: 60_000,
});

async function fetchWithTimeout(url: string, timeoutMs = 3000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function checkOllamaHealth(): Promise<OllamaHealth> {
  const startTime = Date.now();

  try {
    // 1. Ping rapide sur l'API native Ollama pour vérifier la disponibilité
    const versionUrl = new URL('/api/version', env.OLLAMA_BASE_URL);
    const versionRes = await fetchWithTimeout(versionUrl.toString());
    if (!versionRes.ok) {
      throw new Error(`Ollama /api/version returned ${versionRes.status}`);
    }

    const latencyMs = Date.now() - startTime;

    // 2. Liste des modèles installés
    const tagsUrl = new URL('/api/tags', env.OLLAMA_BASE_URL);
    const tagsRes = await fetchWithTimeout(tagsUrl.toString());
    if (!tagsRes.ok) {
      throw new Error(`Ollama /api/tags returned ${tagsRes.status}`);
    }

    const tagsData = (await tagsRes.json()) as {
      models?: Array<{ name: string }>;
    };
    const models = tagsData.models?.map((m) => m.name) ?? [];

    // 3. Vérifie que le modèle par défaut est bien présent
    const defaultModelAvailable = models.includes(DEFAULT_MODEL);

    return {
      available: true,
      latencyMs,
      models,
      defaultModel: DEFAULT_MODEL,
      defaultModelAvailable,
    };
  } catch (error) {
    return {
      available: false,
      error: error instanceof Error ? error.message : 'Unknown error contacting Ollama',
    };
  }
}

/**
 * Modèle par défaut, configurable via DEFAULT_MODEL.
 */
export const DEFAULT_MODEL = env.DEFAULT_MODEL;
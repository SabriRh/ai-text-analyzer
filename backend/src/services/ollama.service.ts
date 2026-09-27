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

export async function checkOllamaHealth(): Promise<OllamaHealth> {
  const startTime = Date.now();

  try {
    const response = await ollamaClient.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [{ role: 'user', content: 'Say "OK" in one word' }],
      max_tokens: 5,
      temperature: 0,
    });

    const latencyMs = Date.now() - startTime;

    // Récupérer la liste des modèles via l'API native Ollama
    const tagsUrl = new URL('/api/tags', env.OLLAMA_URL.replace(/\/v1\/?$/, ''));
    const modelsResponse = await fetch(tagsUrl.toString());
    const modelsData = (await modelsResponse.json()) as { models?: Array<{ name: string }> };
    const models = modelsData.models?.map((m) => m.name) ?? [];

    return { available: true, latencyMs, models };
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
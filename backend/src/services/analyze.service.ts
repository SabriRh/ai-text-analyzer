import { ollamaClient, DEFAULT_MODEL } from './ollama.service.js';
import { buildAnalyzePrompt } from '../prompts/analyze.prompt.js';
import { languageDetection } from '../utils/language.js';
import {
    AnalyzeResultSchema,
    type AnalyzeResult,
} from '../models/analyze.schema.js';
import { UpstreamError } from '../errors/AppError.js';
import { logger } from '../utils/logger.js';

export async function analyzeText(text: string): Promise<AnalyzeResult & { language: string }> {
    const language = languageDetection(text);

    logger.debug({ language, textLength: text.length }, 'Calling Ollama');

    const completion = await ollamaClient.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
            {
                role: 'system',
                content:
                    "Tu es un assistant spécialisé dans l'analyse de texte. Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans texte explicatif.",
            },
            {
                role: 'user',
                content: buildAnalyzePrompt(text, language),
            },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
    });

    const aiContent = completion.choices[0]?.message?.content ?? '';

    let parsed: unknown;
    try {
        parsed = JSON.parse(aiContent);
    } catch {
        throw new UpstreamError('LLM returned invalid JSON', { raw: aiContent });
    }

    const result = AnalyzeResultSchema.safeParse(parsed);
    if (!result.success) {
        throw new UpstreamError('LLM returned unexpected structure', {
            issues: result.error.flatten().fieldErrors,
        });
    }

    return { ...result.data, language };
}
import { UpstreamError } from '../errors/AppError.js';
import {
    AnalyzeResultSchema,
    type AnalyzeResult,
} from '../models/analyze.schema.js';
import { buildASystemPrompt, buildUserPrompt } from '../prompts/analyze.prompt.js';
import { logger } from '../utils/logger.js';
import { detectLanguage } from './language.service.js';
import { DEFAULT_MODEL, ollamaClient } from './ollama.service.js';
import { languageMap } from '../models/analyze.model.js';

export async function analyzeText(text: string): Promise<AnalyzeResult> {
    const detection = detectLanguage(text);
    const isoLanguage = detection.language ?? 'unknown';
    const language = languageMap[isoLanguage] ?? 'unknown';
    const reliability = detection.reliability;

    logger.debug(
        { isoLanguage, language, reliability, isTooCloseToCall: detection.isTooCloseToCall },
        'Language detected'
    );

    logger.debug({ textLength: text.length }, 'Calling Ollama');

    const completion = await ollamaClient.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
            {
                role: 'system',
                content: buildASystemPrompt(),
            },
            {
                role: 'user',
                content: buildUserPrompt(text, language),
            },
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' },
    });

    const aiContent = completion.choices[0]?.message?.content ?? '';

    logger.info({ aiContent }, 'Ollama response content');

    let parsed: unknown;
    try {
        parsed = JSON.parse(aiContent);
        logger.debug({ parsed }, 'Parsed JSON from LLM');
    } catch {
        throw new UpstreamError('LLM returned invalid JSON', { raw: aiContent });
    }

    const result = AnalyzeResultSchema.safeParse(parsed);
    logger.debug({ result }, 'Validated JSON against schema');
    if (!result.success) {
        throw new UpstreamError('LLM returned unexpected structure', {
            issues: result.error.flatten().fieldErrors,
        });
    }

    return result.data;
}

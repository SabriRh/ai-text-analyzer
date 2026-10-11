import { z } from 'zod';

// ============================================================
// Requête entrante
// ============================================================
export const AnalyzeBodySchema = z.object({
    text: z
        .string({ required_error: 'text is required' })
        .trim()
        .min(1, 'text cannot be empty')
        .max(5000, 'text is too long (max 5000 characters)'),
});

export type AnalyzeBody = z.infer<typeof AnalyzeBodySchema>;

// ============================================================
// Réponse du LLM
// ============================================================
export const AnalyzeSentimentSchema = z.enum(['positif', 'negatif', 'neutre']);

export const AnalyzeResultSchema = z.object({
    language: z.enum(['French', 'English', 'Spanish', 'German', 'Italian',
        'Portuguese', 'Dutch', 'Russian', 'Chinese', 'Japanese',
        'Arabic', 'unknown',]),
    corrections: z.array(z.string()),
    reformulated: z.string(),
    optimized: z.string(),
    summary: z.string(),
    key_points: z.array(z.string()),
    sentiment: AnalyzeSentimentSchema,
    // Le décodage contraint n'impose pas min/max : on ramène une échelle 0-100 sur 0-1 et on borne.
    score: z.preprocess(
        (v) => (typeof v === 'number' ? Math.min(1, Math.max(0, v > 1 ? v / 100 : v)) : v),
        z.number().min(0).max(1),
    ),
});

export const LlmAnalyzeResultSchema = AnalyzeResultSchema.omit({ language: true });

//  JSON Schema transmis à Ollama (structured outputs) 
export const LlmAnalyzeJsonSchema = {
    type: 'object',
    properties: {
        corrections: { type: 'array', items: { type: 'string' } },
        reformulated: { type: 'string' },
        optimized: { type: 'string' },
        summary: { type: 'string' },
        key_points: { type: 'array', items: { type: 'string' } },
        sentiment: { type: 'string', enum: AnalyzeSentimentSchema.options },
        score: { type: 'number', minimum: 0, maximum: 1 },
    },
    required: ['corrections', 'reformulated', 'optimized', 'summary', 'key_points', 'sentiment', 'score'],
    additionalProperties: false,
} as const;

export type AnalyzeResult = z.infer<typeof AnalyzeResultSchema>;
export type AnalyzeSentiment = z.infer<typeof AnalyzeSentimentSchema>;
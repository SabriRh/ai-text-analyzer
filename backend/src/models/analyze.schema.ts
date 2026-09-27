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
    corrections: z.array(z.string()),
    reformulated: z.string(),
    optimized: z.string(),
    summary: z.string(),
    key_points: z.array(z.string()),
    sentiment: AnalyzeSentimentSchema,
    score: z.number().min(0).max(1),
});

export type AnalyzeResult = z.infer<typeof AnalyzeResultSchema>;
export type AnalyzeSentiment = z.infer<typeof AnalyzeSentimentSchema>;
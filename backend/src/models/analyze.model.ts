export enum AnalyzeSentiment {
    Positif = 'positif',
    Negatif = 'negatif',
    Neutre = 'neutre'
}

interface AnalyzeFailureResult {
    error: string;
}

interface AnalyzeSuccessResult {
    corrections: string[];
    reformulated: string;
    optimized: string;
    summary: string;
    key_points: string[];
    sentiment: AnalyzeSentiment;
    language: Language;
    score: number;
}

export type AnalyzeResult = AnalyzeFailureResult | AnalyzeSuccessResult;

export interface AnalyzeRequest {
    text?: string;
}

export type Language = 'French' | 'English' | 'Spanish' | 'German' | 'Italian' | 'Portuguese' | 'Dutch' | 'Russian' | 'Chinese' | 'Japanese' | 'Arabic' | 'unknown language to detect';

export const languageMap: Record<string, Language> = {
    'fra': 'French',
    'eng': 'English',
    'spa': 'Spanish',
    'deu': 'German',
    'ita': 'Italian',
    'por': 'Portuguese',
    'nld': 'Dutch',
    'rus': 'Russian',
    'zho': 'Chinese',
    'jpn': 'Japanese',
    'ara': 'Arabic'
}
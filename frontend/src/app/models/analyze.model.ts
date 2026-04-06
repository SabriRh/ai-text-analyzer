// Requête envoyée au backend
export interface AnalyzeRequest {
    text: string;
}

export interface AnalyzeResult {
    original: string;
    detectedLanguage: string;
    corrections: string[];
    reformulated: string;
    optimized: string;
    summary: string;
    key_points: string[];
    sentiment: 'positif' | 'negatif' | 'neutre';
    score: number;
    language: string;
}

export interface AnalyzeResponse {
    success: boolean;
    data?: AnalyzeResult;
    error?: string;
}
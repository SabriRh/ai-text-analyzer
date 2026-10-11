export interface AnalyzeRequest {
    text: string;
}

export interface AnalyzeResponse {
    language: string;
    corrections: string[];
    reformulated: string;
    optimized: string;
    summary: string;
    key_points: string[];
    sentiment: 'positif' | 'negatif' | 'neutre';
    score: number;
}
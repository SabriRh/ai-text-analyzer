export interface AppState {
    isLoading: boolean;
    isInitializing: boolean;
    isAnalyzing: boolean;
    isCheckingHealth: boolean;
}

export type ResultTab = 'corrections' | 'reformulated' | 'optimized' | 'summary' | 'keypoints';

export interface ErrorMessage {
    message: string;
    severity: 'info' | 'warning' | 'error';
    timestamp: Date;
}
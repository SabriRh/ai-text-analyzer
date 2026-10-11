import { Tongue } from '@desert-ant-labs/tongue';

let tongueInstance: Awaited<ReturnType<typeof Tongue.load>> | null = null;

export async function initLanguageService(): Promise<void> {
    if (!tongueInstance) {
        tongueInstance = await Tongue.load();
    }
}

export interface LanguageDetection {
    language: string | null;
    reliability: 'confident' | 'likely' | 'tentative' | 'empty';
    isTooCloseToCall: boolean;
}

export function detectLanguage(text: string): LanguageDetection {
    if (!tongueInstance) {
        throw new Error('LanguageService not initialized. Call initLanguageService() first.');
    }

    const result = tongueInstance.detect(text);

    return {
        language: result.language,
        reliability: result.reliability,
        isTooCloseToCall: result.isTooCloseToCall,
    };
}
import franc from 'franc';
import { languageMap, Language } from '../models/analyze.model.js';

export const languageDetection = (text: string): Language => {
    if (text.length < 20) {
        return 'unknown language to detect';
    }
    const detectedLanguage = franc(text);
    return languageMap[detectedLanguage] || 'English';
};
export type Language = 'French' | 'English' | 'Spanish' | 'German' | 'Italian' | 'Portuguese' | 'Dutch' | 'Russian' | 'Chinese' | 'Japanese' | 'Arabic' | 'unknown';

/** Codes ISO 639-1 renvoyés par Tongue. */
export const languageMap: Record<string, Language> = {
    'fr': 'French',
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'nl': 'Dutch',
    'ru': 'Russian',
    'zh': 'Chinese',
    'ja': 'Japanese',
    'ar': 'Arabic'
}
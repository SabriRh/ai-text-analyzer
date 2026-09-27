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
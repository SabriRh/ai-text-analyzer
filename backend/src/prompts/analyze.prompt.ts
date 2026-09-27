import { Language } from '../models/analyze.model.js';

export const buildAnalyzePrompt = (text: string, language: Language): string => {
  return `Analyze texts and return a JSON with this structure.
IMPORTANT : The text is in ${language}. Your analysis MUST be in the SAME language as the text.
Exemple 1 (French) :
Text : "Je suis très content de cette application, elle fonctionne parfaitement bien."
Response : {
  "corrections": [],
  "reformulated": "Je suis extrêmement satisfait de cette application qui fonctionne parfaitement.",
  "optimized": "Application parfaite, très content.",
  "summary": "Utilisateur satisfait de l'application.",
  "key_points": ["Application fonctionne bien", "Utilisateur content"],
  "sentiment": "positif",
  "score": 0.9
}

Exemple 2 (English) :
Text : "The service is slow and the interface is complicated."
Response : {
  "corrections": ["service slow", "interface complicated"],
  "reformulated": "The service lacks speed and the interface is too complex.",
  "optimized": "low service, complicated interface.",
  "summary": "Negative review about slowness and complexity.",
  "key_points": ["low service", "Complicated interface"],
  "sentiment": "negatif",
  "score": 0.2
}
Now analyze THIS text (do not copy the examples) :
Text : "${text}"
Response json only, no markdown, no explanations.`;
};
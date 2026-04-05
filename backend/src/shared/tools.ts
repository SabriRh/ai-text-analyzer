import dotenv from 'dotenv'
import franc from 'franc';
import { languageMap, Language } from '../models/analyze.model';
import { OllamaHealth } from '../models/health.model';
import OpenAI from 'openai'

dotenv.config()
const ollama = new OpenAI({
    baseURL: process.env.OLLAMA_URL,
    apiKey: 'ollama'
})

export const buildAnalyzePrompt = (text: string, language: Language): string => {
    const prompt = `Analyze texts and return a JSON with this structure.
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
    console.log(`Generated prompt: ${prompt}`);
    return prompt;
};

export const languageDetection = (text: string): Language => {
    if (text.length < 20) {
        console.log('Texte trop court pour franc, utilisation du LLM')
        return 'unknown language to detect';
    }
    const detectedLanguage = franc(text);
    console.log(`Detected language code: ${detectedLanguage}`);
    return languageMap[detectedLanguage] || 'English';
};

export async function checkOllamaHealth(): Promise<OllamaHealth> {
    const startTime = Date.now()

    try {
        const response = await ollama.chat.completions.create({
            model: 'llama3.2:1b',
            messages: [
                { role: 'user', content: 'Say "OK" in one word' }
            ],
            max_tokens: 5,
            temperature: 0
        })

        const latencyMs = Date.now() - startTime

        let models: string[] = []
        try {
            const modelsResponse = await fetch('http://localhost:11434/api/tags')
            const modelsData = await modelsResponse.json()
            models = modelsData.models?.map((m: any) => m.name) || []
        } catch (e) {
            throw new Error('Failed to fetch models from Ollama: ' + (e as Error).message)
        }

        console.log('Ollama health check successful:', { latencyMs, models })

        return {
            available: true,
            latencyMs,
            models
        }

    } catch (error: any) {
        return {
            available: false,
            error: error.message || 'Impossible de contacter Ollama'
        }
    }
}
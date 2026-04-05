import { Request, Response } from 'express'
import { AnalyzeRequest, AnalyzeResult, Language } from '../models/analyze.model';
import OpenAI from 'openai';
import { languageDetection, buildAnalyzePrompt } from '../shared/tools';


export const textAnalyze = async (req: Request<AnalyzeRequest>, res: Response<AnalyzeResult>) => {
    const contentType = req.headers['content-type'];
    const text = req.body && req.body.text;
    if (contentType !== 'application/json') {
        return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
    if (!text) {
        return res.status(400).json({ error: 'Text is required in the request body' });
    }

    const ollama = new OpenAI({
        apiKey: process.env.OLLAMA_API_KEY,
        baseURL: process.env.OLLAMA_URL,
    });

    try {
        const language: Language = languageDetection(text);
        const completion = await ollama.chat.completions.create({
            model: 'llama3.2:1b',
            messages: [
                {
                    role: 'system',
                    content: 'Tu es un assistant spécialisé dans l\'analyse de texte. Tu réponds UNIQUEMENT en JSON valide, sans markdown, sans texte explicatif.'
                },
                {
                    role: 'user',
                    content: buildAnalyzePrompt(text, language)
                }
            ],
            temperature: 0.2,
            response_format: {
                type: 'json_object'
            },
        });

        const aiContent = completion.choices[0].message.content || '';
        const analyzeResult: AnalyzeResult = JSON.parse(aiContent);

        res.status(200).json({ ...analyzeResult, language: language });
    }
    catch (error) {
        console.error('Error during text analysis:', error);
        return res.status(500).json({ error: 'An error occurred during text analysis' });
    }
};


export default textAnalyze;
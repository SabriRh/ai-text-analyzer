import type { Request, Response } from 'express';
import type { AnalyzeBody } from '../models/analyze.schema.js';
import { analyzeText } from '../services/analyze.service.js';

export async function textAnalyze(req: Request, res: Response) {
    const { text } = req.body as AnalyzeBody;

    const result = await analyzeText(text);

    res.status(200).json(result);
}
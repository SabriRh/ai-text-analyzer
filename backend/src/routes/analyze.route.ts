import { Router } from 'express';
import { textAnalyze } from '../controllers/analyze.controller.js';
import { validateBody } from '../middlewares/validateBody.js';
import { AnalyzeBodySchema } from '../models/analyze.schema.js';

const router = Router();

router.post('/', validateBody(AnalyzeBodySchema), textAnalyze);

export default router;
import { Router } from 'express';
import { textAnalyze } from '../controllers/analyze.controller';
const router = Router();

router.post('/', textAnalyze);

export default router;
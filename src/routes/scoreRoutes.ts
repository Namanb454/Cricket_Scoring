import express from 'express';
import { updateScore } from '../controllers/scoreController';

const router = express.Router();

router.post('/update-score', updateScore);

export default router;
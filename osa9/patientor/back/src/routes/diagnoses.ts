import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

// root /api/diagnoses
router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
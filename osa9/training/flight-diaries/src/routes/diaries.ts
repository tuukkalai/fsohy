import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveDiaryEntries());
});

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
  
    const addedEntry = diaryService.addEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e);
  }
});

export default router;
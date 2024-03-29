/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    res.send(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(404).json({ error: 'Patient not found', message: errorMessage });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: 'Something went wrong', message: errorMessage });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatient(req.params.id);
    if (!patient) {
      throw new Error('Patient not found');
    }
    const newEntry = utils.toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patient, newEntry);
    res.json(updatedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(400).json({ error: 'Something went wrong', message: errorMessage });
    
  }
});

export default router;

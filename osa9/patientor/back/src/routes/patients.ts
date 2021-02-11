import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const {name, dateOfBirth, ssn, gender, occupation} = req.body;
  const newPatient: Patient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });
  res.json('Patient added');
});

export default router;

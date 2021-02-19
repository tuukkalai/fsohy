import uuid from 'uuid';
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<PublicPatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const getPatient = (id: string): Patient => {
  const patient: Patient = patients.filter(p => p.id === id)[0];
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid.v4(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient
};
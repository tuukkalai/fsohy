import patientData from '../../data/patients';
import { Patient, NonSensitivePatient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};

const addPatient = (object: NewPatient): Patient => {
  const newPatient = {
    id: Math.max(...patients.map(p => p.id)) + 1,
    name: object.name,
    dateOfBirth: object.dateOfBirth,
    ssn: object.ssn,
    gender: object.gender,
    occupation: object.occupation
  };
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};
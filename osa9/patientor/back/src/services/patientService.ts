// In some cases the following import does not work
import { v4 as uuid } from 'uuid';
// If it doesn't, try with the following
// And change the newPatient id creation with uuid.v4()
// import uuid from 'uuid';
import patientData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';

let patients: Array<Patient> = patientData;

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
    ...patient,
    id: uuid()
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: NewEntry): Patient => {
  const now = new Date();
  const month = (now.getMonth().toString().length < 2) ? '0' + now.getMonth().toString() : now.getMonth().toString();
  const date = (now.getDate().toString().length < 2) ? '0' + now.getDate().toString() : now.getDate().toString();
  const pvm = `${now.getFullYear()}-${month}-${date}`;

  const addedEntry = {
    ...entry,
    id: uuid(),
    date: pvm
  };

  const updatedPatient = {
    ...patient,
    entries: patient.entries?.concat(addedEntry)
  };

  //const id = patients.findIndex(p => p.id === patient.id);

  //patients[id].entries?.concat(addedEntry);

  patients = patients.map(p => {
    if (p.id === updatedPatient.id) {
      return updatedPatient;
    }
    return p;
  });

  return updatedPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};
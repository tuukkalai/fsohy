/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  NewPatient,
  Gender,
  NewEntry,
  NewBaseEntry,
  healthCheckTypes,
  Diagnosis,
  healthCheckRating,
  SickLeave,
  Discharge
} from "./types";

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: [] 
  };
};

const toNewEntry = (object: any): NewEntry => {
  const newEntry = toNewBaseEntry(object) as NewEntry;
  switch(newEntry.type) {
    case healthCheckTypes.HealthCheck:
      newEntry.healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
      return newEntry;
    case healthCheckTypes.OccupationalHealthcare:
      newEntry.employerName = parseString(object.employerName);
      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }
      return newEntry;
    case healthCheckTypes.Hospital:
      newEntry.discharge = parseDischarge(object.discharge);
      return newEntry;
    default:
      return assertNever(newEntry);
  }
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    specialist: parseString(object.specialist),
    description: parseString(object.description),
    type: parseHealthType(object.type)
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}; 

const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing string");
  }
  return str;
};

const parseDate = (date: any): string => {
  if (!date || !isDate(date) || !isString(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  // Checking that the SSN is in Finnish SSN format, e.g. 010189-123K
  if (ssn.length > 11 || ssn.length < 11) {
    throw new Error("SSN incorrect length");
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

const parseHealthType = (type: any): healthCheckTypes => {
  if (!type || !isString(type) || !isHealthType(type)) {
    throw new Error("Incorrect or missing healthCheckType");
  }
  return type;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> => {
  if (!Array.isArray(codes) || !codes.every(code => isString(code))) {
    throw new Error("Incorrect or missing DiagnosisCode");
  }
  return codes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: any): healthCheckRating => {
  if (rating === undefined || !Object.values(healthCheckRating).includes(rating)){
    throw new Error("Incorrect or missing HealthCheck Rating");
  }
  return rating as healthCheckRating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing SickLeave");
  }
  return sickLeave as SickLeave;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge) {
    throw new Error("Incorrect or missing Discharge");
  }
  return discharge as Discharge;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isHealthType = (type: any): type is healthCheckTypes => {
  return Object.values(healthCheckTypes).includes(type);
};

const isSickLeave = (sickLeave: any): boolean => {
  return isDate(sickLeave.startDate) && isDate(sickLeave.endDate);
};

const isDischarge = (discharge: any): boolean => {
  return isDate(discharge.date) && isString(discharge.criteria);
};

export default {
  toNewPatient,
  toNewEntry
};

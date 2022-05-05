export interface BaseEntry {
  id: string;
  date: string;
  type: healthCheckTypes;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: healthCheckTypes.HealthCheck;
  healthCheckRating: healthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: healthCheckTypes.OccupationalHealthcare;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: healthCheckTypes.Hospital;
  discharge: Discharge;
}

export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export type NewEntry = 
  | Omit<HealthCheckEntry, 'id' | 'date'>
  | Omit<OccupationalHealthcareEntry, 'id' | 'date'>
  | Omit<HospitalEntry, 'id' | 'date'>;

export type NewBaseEntry = Omit<BaseEntry, 'id' | 'date'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  'Male' = 'male',
  'Female' = 'female',
  'Other' = 'other'
}

export enum healthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export enum healthCheckTypes {
  'HealthCheck' = 'HealthCheck',
  'OccupationalHealthcare' = 'OccupationalHealthcare',
  'Hospital' = 'Hospital'
}
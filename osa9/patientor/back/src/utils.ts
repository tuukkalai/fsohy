/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from "./types";

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

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export default toNewPatient;

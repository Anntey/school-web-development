import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (input: any): input is Gender => {
  return Object.values(Gender).includes(input);
};

const checkOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const checkGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender)
  } 
  return gender;
};

const checksSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  return ssn;
};

const checkDateOfBirth = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const checkName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: checkName(object.name),
    dateOfBirth: checkDateOfBirth(object.dateOfBirth),
    ssn: checksSsn(object.ssn),
    gender: checkGender(object.gender),
    occupation: checkOccupation(object.occupation),
    entries: object.entries
  }
};

export default toNewPatient;
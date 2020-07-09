import patients from '../../data/patients'
import { NonSensitivePatient, Patient, NewPatient, Entry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatient): Patient => {  
  const newPatient = {
    ...entry,
    entries: [],
    id: 's95nus549-sn45uysu45y9s-45ys45y'
  }
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: Entry): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  patient?.entries.push({
    ...entry,
    id: 's95ts59-sn46wsywfdsu45y9s-45y5y' 
  })
  return patient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  findById,
  addPatient,
  addEntry
};
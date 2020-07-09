import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { Patient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
})

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    
    res.json(addedPatient);
  } catch (error) {
    res.status(400).send(error.message)
  }
});

router.get('/:id/entries', async (req, res) => {
  const patient: Patient | undefined = patientService.findById(req.params.id);

  if (!patient) {
    res.sendStatus(404);
  } else {
    const entries: Entry[] = patient.entries
    res.json(entries)
  }
})

router.post('/:id/entries', (req, res) => {
  const entry: Entry = req.body
  const patient = patientService.findById(req.params.id)
  const { description, date, specialist, type } = entry

  if( !description || !date || !specialist || !type ) {
    res.status(400).send({'error': 'basic info missing'}).end()
  }

  if (!patient) {
    res.sendStatus(404);
  } else {
    const updatedPatient = patientService.addEntry(req.params.id, entry);
    res.status(201).json(updatedPatient)
  }
})

export default router;
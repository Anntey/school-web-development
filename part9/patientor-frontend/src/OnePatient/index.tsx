import React, { useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Icon, Card } from 'semantic-ui-react';
import { Patient, Entry } from '../types';
import { useStateValue, getOnePatient } from '../state';
import { useParams } from 'react-router-dom';
import AddEntryForm from '../AddEntryForm'
import { OccupationalHealthcareEntry } from '../types';

const OnePatient: React.FC = () => {
  const [{ patient, diagnoses }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient= async() => {
      const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(getOnePatient(patientFromApi));
    };

    if(!(patient?.id === id)){
        getPatient();
    }
  },[dispatch, patient, id]);

  if(!patient) {
    return null;
  }

  const entries: Entry[] = patient.entries

  const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
    <div>
      <Card color='red' style={{marginBottom:18}}>
        <Card.Content header={entry.date} style={{paddingTop:18}} />
        <Card.Content description={entry.description} />
        <Card.Content extra>
          <ul>
          {entry.diagnosisCodes?.map((code, i) => 
            <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
          )}
          </ul>
        </Card.Content>
      </Card>   
    </div>
  )

  const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
    <div>
      <Card color='yellow' style={{marginBottom:18}}>
        <Card.Content header={entry.date} style={{paddingTop:18}} />
        <Card.Content description={entry.description} />
        <Card.Content extra>
          <ul>
          {entry.diagnosisCodes?.map((code, i) => 
            <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
          )}
          </ul>
        </Card.Content>
      </Card>   
    </div>
  )

  const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => (
    <div>
      <Card color='green' style={{marginBottom:18}}>
        <Card.Content header={entry.date} style={{paddingTop:18}} />
        <Card.Content description={entry.description} />
        <Card.Content extra >
          <ul>
          {entry.diagnosisCodes?.map((code, i) => 
            <li key={i}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
          )}
          </ul>
        </Card.Content>
      </Card>   
    </div>
  )

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry} />
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntry entry={entry} />
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} />
      default:
        return null
    }
  }

  const addEntry = async (values: Omit<OccupationalHealthcareEntry, 'id'>) => {
    try{
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`, 
        values
      );
      dispatch(getOnePatient(updatedPatient));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='App'>

      <Container textAlign='left'>
        <h3>{patient.name} {patient.gender === 'male' ? <Icon name='mars'></Icon> : <Icon name='venus'></Icon>}</h3>
        <p>SSN: {patient.ssn}</p>
        <p>Occupation: {patient.occupation}</p>
      </Container>

      <Container>
        <div></div>
        <h4>Entries</h4>
        {entries.map(entry => <EntryDetails entry={entry} /> )}
      </Container>

      <AddEntryForm onSubmit={addEntry}/>

    </div>
  );
};

export default OnePatient;

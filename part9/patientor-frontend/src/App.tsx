import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';
import { apiBaseUrl } from './constants';
import { useStateValue, setPatients, setDiagnoses } from './state';
import { Patient, Diagnosis } from './types';
import Patients from './Patients';
import OnePatient from './OnePatient';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatients = async () => {
      try {
        const { data: patientsFromApi } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        dispatch(setPatients(patientsFromApi));
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(setDiagnoses(diagnosesFromApi));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
    fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className='App'>
      <Router>
        <Container>
          <Header as='h1'>Patientor</Header>

          <Button as={Link} to='/' primary>Home</Button>

          <Divider hidden />

          <Switch>
            <Route path='/patients/:id' render={() => <OnePatient />} />
            <Route path='/' render={() => <Patients />} />
          </Switch>

        </Container>
      </Router>
    </div>
  );
};

export default App;

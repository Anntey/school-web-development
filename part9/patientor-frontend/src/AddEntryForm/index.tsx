import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, DiagnosisSelection } from '../AddPatientForm/FormField';
import { useStateValue } from '../state';
import { OccupationalHealthcareEntry } from '../types';

interface Props {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, 'id'>) => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnoses }] = useStateValue()

    return (
      <Formik
        initialValues={{
          date: '',
          type: 'OccupationalHealthcare',
          specialist: '',
          employerName: '',
          description: '',
          diagnosisCodes: [],
          sickLeave: {
            startDate: '',
            endDate: ''
          }
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = 'Field is required';
            const errors: { [field: string]: string } = {};
            if (!values.date) {
            errors.date = requiredError;
            }
            if (!values.type) {
            errors.type = requiredError;
            }
            if (!values.specialist) {
            errors.specialist = requiredError;
            }
            if (!values.employerName) {
            errors.employerName = requiredError;
            }
            if (!values.description) {
            errors.description = requiredError;
            }
            if (!values.sickLeave) {
                errors.startDate = requiredError;
            }
            return errors;
        }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>

            <Field
              label='type'
              placeholder='Entry type'
              name='type'
              component={TextField}
            />            
            <Field
              label='date'
              placeholder='Date (YYYY-MM-DD)'
              name='date'
              component={TextField}
            />
            <Field
              label='description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <Field
              label='specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='employerName'
              placeholder='Employer'
              name='employerName'
              component={TextField}
            />
            <Field
              label='startDate'
              placeholder='Start date'
              name='sickLeave.startDate'
              component={TextField}
            />
            <Field
              label='endDate'
              placeholder='End date'
              name='sickLeave.endDate'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button
                type="submit"
                floated="left"
                color="green"
                disabled={!dirty || !isValid}
                >Add</Button>
              </Grid.Column>
            </Grid>

          </Form>
        );
      }}
    </Formik>
    );
  };

export default AddEntryForm;

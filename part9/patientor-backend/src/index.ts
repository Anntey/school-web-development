const express = require('express');
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

const PORT = 3003;

app.get('/api/ping', (_req: any, res: any) => { 
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
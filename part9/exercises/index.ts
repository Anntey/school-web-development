import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (req.query.height === undefined) throw new Error('not enough parameters');
  if (req.query.weight === undefined) throw new Error('not enough parameters');

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height) throw new Error('malformatted parameters');
  if (!weight) throw new Error('malformatted parameters');

  const bmiResult: string = calculateBmi(height, weight);

  res.send({
    weight: weight,
    height: height,
    bmi: bmiResult
  });
});

interface ExerciseData {
  daily_exercises: number[],
  target: number
}

app.post('/exercises', (request, response) => { 
  const body: ExerciseData = request.body;
  const hours: number[] = body.daily_exercises;
  const target = Number(body.target);

  if (hours === undefined) throw new Error('nparameters missing');
  if (target === undefined) throw new Error('parameters missing');
  if (isNaN(target)) throw new Error('malformatted parameters');

  console.log(target)
  const excResult = calculateExercises(hours, target);

  response.json(excResult);
});
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
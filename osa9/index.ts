import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, { parseInternetArguments } from './exerciseCalculator';

interface ExerciseCalculatorPost {
  daily_exercises: number;
  target: number;
}

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!isNaN(Number(req.query.weight)) && !isNaN(Number(req.query.height))){
    res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
  } else {
    res.status(401).json({error: 'Malformatted parameters.'});
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseCalculatorPost;
  if (!daily_exercises || !target)
    return res.status(400).json({ error: 'parameters missing' });
  try {
    const info = parseInternetArguments([2,1,3,4,5,6,7]);
    const response = calculateExercises(info);
    return res.json(response);
  } catch {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
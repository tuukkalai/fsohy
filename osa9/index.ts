import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises, { parseWebArguments } from './exerciseCalculator';

interface ExerciseCalculatorPost {
  daily_exercises: string;
  target: string;
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
  console.log('daily_exercises', daily_exercises);
  if (!daily_exercises || !target)
    return res.status(400).json({ error: 'parameters missing' });
  try {
    const info = parseWebArguments([daily_exercises, target]);
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
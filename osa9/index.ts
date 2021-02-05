import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
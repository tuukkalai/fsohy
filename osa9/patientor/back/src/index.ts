import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
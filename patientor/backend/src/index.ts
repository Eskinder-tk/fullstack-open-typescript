import express from 'express';
import diagnoseRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.use('/api/diagnoses' , diagnoseRouter);
app.use('/api/patients' , patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
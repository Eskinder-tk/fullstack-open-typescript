import express  from "express";
import { calcultateBmi } from "./bmiCalculator.ts";
import { calcultateExercises } from "./exerciseCalculator.ts";

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.status(200).send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) ) {
    return res.status(400).send({error: 'malformatted parameters'});
  }

  try {
    const result = calcultateBmi(weight , height);
    return res.status(200).send({
      weight : weight,
      height : height,
      bmi : result
    });
  } catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }
});



app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (Object.keys(req.body).length > 2 || Object.keys(req.body).length < 2) {
    return res.status(400).send({error: "parameters missing"});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const daily_exercises = (req.body.daily_exercises);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((value) => typeof value === 'number')
  ) {
    return res.status(400).send({error: "malformatted parameters"});
  }

  if (Number.isNaN(target)) {
    return res.status(400).send({error: "malformatted parameters"});
  }

  try {
    const result = calcultateExercises(daily_exercises , target);
    return res.status(200).send(result);
  } catch (error) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    return res.status(400).send(errorMessage);
  }

});


const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
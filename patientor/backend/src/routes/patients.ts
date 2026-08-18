import express, { type Request, type Response} from 'express';
import patientService from "../services/patientService.ts";
import { type NewPatientEntery, type Patient } from "../types.ts";
import { newPatientParser, errorMiddleware } from '../middlewares.ts';

const patientsRouter = express.Router();

patientsRouter.get('/' , (_req,res) => {
    const data = patientService.getNonSensitivePatientEnteries();
    res.status(200).send(data);
});


patientsRouter.post('/' , newPatientParser, (req: Request<unknown , unknown , NewPatientEntery>, res: Response<Patient>) => {
 
    const addedEntery = patientService.addPatient(req.body);
    res.send(addedEntery);

});

patientsRouter.use(errorMiddleware);

export default patientsRouter;
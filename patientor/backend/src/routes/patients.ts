import express, { type Request, type Response} from 'express';
import patientService from "../services/patientService.ts";
import { type Entry, type EntryWithoutId, type NewPatientEntery, type Patient } from "../types.ts";
import { newPatientParser, errorMiddleware, newPatientEntryParser } from '../middlewares.ts';
import patientEnteries from '../data/patientsData.ts';

const patientsRouter = express.Router();

patientsRouter.get('/' , (_req,res) => {
    const data = patientService.getPatientEnteries();
    res.status(200).send(data);
});


patientsRouter.post('/' , newPatientParser, (req: Request<unknown , unknown , NewPatientEntery>, res: Response<Patient>) => {
    const addedEntery = patientService.addPatient(req.body);
    res.status(200).send(addedEntery);
});

patientsRouter.get('/:id' , (req , res) => {
    const id = req.params.id;
    try {
        const patient = patientService.getPatientDetail(id);
        res.send(patient);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(404).send(error.message);
        } else {
            res.status(404).send('An unknown error has occured!');
        }
    }
});

patientsRouter.post('/:id/entries', newPatientEntryParser , (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry | string>, ) => {
    const id = req.params.id;
    const patient = patientEnteries.find(p => p.id === id);
    if(patient){
        try {
            const addedEntery = patientService.addPatientEntry(req.body , patient);
            res.send(addedEntery);
        } catch (error) {
            if(error  instanceof Error){
                res.status(400).send(error.message);
            } else {
                res.status(404).send('An unknown error has occured!');
            }
        }
    }else {
        res.send('Something went wrong!');
    }
    
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;
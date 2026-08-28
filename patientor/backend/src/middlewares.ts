import { type Request, type Response, type NextFunction } from 'express';
import { NewPatientEnterySchema,  EntryWithoutIdSchema } from './types.ts';
import z from 'zod';


export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewPatientEnterySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newPatientEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    EntryWithoutIdSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
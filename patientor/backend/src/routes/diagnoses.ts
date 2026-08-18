import express from "express";
import diagnoseService from "../services/diagnoseService.ts";

const diagnoseRouter = express.Router();

diagnoseRouter.get('/' , (_req,res) => {
    const data = diagnoseService.getDiagnosisEnteries();
    res.status(200).send(data);
});


export default diagnoseRouter;
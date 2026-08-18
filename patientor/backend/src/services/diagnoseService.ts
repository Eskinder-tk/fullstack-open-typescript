import type { Diagnosis } from "../types.ts";
import diagnoseEnteries from "../data/diagnosesData.ts";


const getDiagnosisEnteries = (): Diagnosis [] => {
    return diagnoseEnteries;
};


export default {
    getDiagnosisEnteries
};
import type { Patient , NonSensitivePatient , NewPatientEntery} from "../types.ts";
import patientEnteries from "../data/patientsData.ts";
import { v4 as uuidv4 } from 'uuid';

const getPatientEnteries = (): Patient [] => {
    return patientEnteries;
};

const getNonSensitivePatientEnteries = (): NonSensitivePatient [] => {
    return patientEnteries.map(({id, name , dateOfBirth , gender , occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntery): Patient => {
    const id = uuidv4();
    const newPatientEntery = {
        id: id, ...entry
    };

    patientEnteries.push(newPatientEntery);

    return newPatientEntery;

};

export default {
    getPatientEnteries,
    getNonSensitivePatientEnteries,
    addPatient
};
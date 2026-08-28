import type { Patient , NonSensitivePatient , NewPatientEntery, EntryWithoutId} from "../types.ts";
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

const addPatientEntry = (entry: EntryWithoutId , patient: Patient) => {
    const id = uuidv4();
    const newEntry = {
        id: id, ...entry
    };
    

    
    patient.entries.push(newEntry);
    return newEntry;
    

};

const getPatientDetail =(id: string): Patient => {
    const patient = patientEnteries.find(p => p.id === id);
    if(patient) {
        return {
            ...patient, entries: patient.entries ?? []
        };
    }else {
        throw new Error('Patient Not Found!');
    }
};

export default {
    getPatientEnteries,
    getNonSensitivePatientEnteries,
    addPatient,
    getPatientDetail,
    addPatientEntry
};
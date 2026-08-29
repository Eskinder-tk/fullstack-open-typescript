import { useState } from 'react';
import { Typography, Card , CardContent, Button, TextField, Box, Stack, Select, MenuItem, FormControl, InputLabel, OutlinedInput, SelectChangeEvent, Chip, Alert } from '@mui/material';
import { Patient, Diagnosis, HealthCheckRating } from "../../types";
import { Female, Male } from "@mui/icons-material";
import { useMatch } from 'react-router-dom';
import EntryDetails from './EntryDetails';
import patientService from '../../services/patients';
import React, { Dispatch, SetStateAction } from 'react';

interface props {
    patients: Patient[];
    diagnoses: Diagnosis[];
    setPatients: Dispatch<SetStateAction<Patient[]>>;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  slotProps: {
    paper: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  },
};

const PatientDetail = ({patients, diagnoses, setPatients}: props ) => {

    type EntryType = "Hospital" | "OccupationalHeathcare" | "HealthCheck"
    
    const [showForm , setShowForm] = useState(false);
    const [message , setMessage] = useState('');
    const [type , setType] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [specialist, SetSpecialist] = useState('');
    const [diagnosesCodes , setDiagnosesCodes] = useState<string[]>([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    const [employerName , setEmployerName] = useState('');
    const [startDate , setStartDate] = useState('');
    const [endDate , setEndDate] = useState('');
    const [health, setHealth] = useState<number>(0);

    const match = useMatch('/patients/:id');
    const patient = match ? patients.find(p => p.id === match.params.id) : null;

    const visible = showForm ? 'none': '';

    const handleAdd = () => {
        setShowForm(true);
    };

    const handleChange = (event: SelectChangeEvent<typeof diagnosesCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosesCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleHospitalSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!patient || !dischargeDate || !date){
        setMessage('Some input are missing.');
        setTimeout(() => {
                setMessage('');
            }, 500);
        return;
    }
    const entry = {
        date: date,
        type: "Hospital" as const,
        description: description,
        specialist: specialist,
        diagnosisCodes: diagnosesCodes,
        discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
        }
    };
    try {
        const addedEntry = await patientService.createEntry(entry, patient.id);
        setShowForm(false);
        setType('');
        setPatients((currentPatients) =>
            currentPatients.map((currentPatient) =>
                currentPatient.id === patient.id
                    ? {
                        ...currentPatient,
                        entries: currentPatient.entries.concat(addedEntry),
                    }
                    : currentPatient
            )
        );
        onCancel();

    } catch (error) {
        if(error instanceof Error){
            setMessage(error.message);
            setTimeout(() => {
                setMessage('');
            }, 500);
        } else {
            setMessage('An unknown error has occured: please report the issue to easkndrtk@gmail.com!');
            setTimeout(() => {
                setMessage('');
            }, 500);
        }
    }
  };

  const handleOccupationalSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!patient || !startDate || !endDate || !date){
        setMessage('Some input are missing.');
        setTimeout(() => {
                setMessage('');
            }, 500);
        return;
    }
    const entry = {
        date: date,
        type: "OccupationalHealthcare" as const,
        description: description,
        specialist: specialist,
        diagnosisCodes: diagnosesCodes,
        employerName: employerName,
        sickLeave: {
            startDate: startDate,
            endDate: endDate
        }
    };
    try {
        const addedEntry = await patientService.createEntry(entry, patient.id);
        setShowForm(false);
        setType('');
        setPatients((currentPatients) =>
            currentPatients.map((currentPatient) =>
                currentPatient.id === patient.id
                    ? {
                        ...currentPatient,
                        entries: currentPatient.entries.concat(addedEntry),
                    }
                    : currentPatient
            )
        );
        onCancel();

    } catch (error) {
        if(error instanceof Error){
            setMessage(error.message);
            setTimeout(() => {
                setMessage('');
            }, 500);
        }else {
            setMessage('An unknown error has occured: please report the issue to easkndrtk@gmail.com!');
            setTimeout(() => {
                setMessage('');
            }, 500);
        }
    }
  };

  const handleHealthSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!patient || health === undefined || !date){
        setMessage('Some input are missing.');
        setTimeout(() => {
                setMessage('');
            }, 500);
        return;
    }
    const entry = {
        date: date,
        type: "HealthCheck" as const,
        description: description,
        specialist: specialist,
        diagnosisCodes: diagnosesCodes,
        healthCheckRating: health as HealthCheckRating
    };
    try {
        const addedEntry = await patientService.createEntry(entry, patient.id);
        setShowForm(false);
        setType('');
        setPatients((currentPatients) =>
            currentPatients.map((currentPatient) =>
                currentPatient.id === patient.id
                    ? {
                        ...currentPatient,
                        entries: currentPatient.entries.concat(addedEntry),
                    }
                    : currentPatient
            )
        );
        onCancel();

    } catch (error) {
        if(error instanceof Error){
            setMessage(error.message);
            setTimeout(() => {
                setMessage('');
            }, 500);
        }else {
            setMessage('An unknown error has occured: please report the issue to easkndrtk@gmail.com!');
            setTimeout(() => {
                setMessage('');
            }, 500);
        }
    }
  };

  const notifyMessage = () => {
    if(message !== ''){
        return (
            <Alert severity="error">{message}</Alert>
        );
    }else {
        return null;
    }
  };

  const onCancel = () => {
    setShowForm(false);
    setType('');
    setDate('');
    setDescription('');
    setDischargeCriteria('');
    setDiagnosesCodes([]);
    setEmployerName('');
    setEndDate('');
    setHealth(0);
    setStartDate('');
    setDischargeDate('');
    SetSpecialist('');
  };

    const hospitalEntryForm = () => {
        if (type === "Hospital") {
            return (
                <Stack spacing={2}>
                    <TextField label="dischargeDate" type="date" slotProps={{ inputLabel: { shrink: true } }}  value={dischargeDate} onChange={(e) => setDischargeDate(e.target.value)}  />
                    <TextField label="Discharge-Criteria" value={dischargeCriteria} onChange={(e) => setDischargeCriteria(e.target.value)}/>
                    <Button variant="contained" onClick={handleHospitalSubmit}>Add</Button>
                    <Button variant="outlined" onClick={onCancel}>Cancel</Button>
                </Stack>
            );
        }else {
            return null;
        }
    };

    const OccupationalEntryForm = () => {
        if (type === "OccupationalHealthcare"){
            return (
            <Stack spacing={2}>
                <TextField label="emplayer-name" value={employerName} onChange={(e) => setEmployerName(e.target.value)}/>
                
                    <TextField type="date" label="startDate" slotProps={{ inputLabel: { shrink: true } }}  value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <TextField type="date" label="endDate" slotProps={{ inputLabel: { shrink: true } }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <Button variant="contained" onClick={handleOccupationalSubmit}>Add</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </Stack>
        );
        } else {
            return null;
        }
    };

    const healthCheckEntryForm = () => {

        if(type === "HealthCheck"){
            return (
            <Stack spacing={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo">Health Check Rating</InputLabel>
                    <Select
                        labelId="demo"
                        id="demo"
                        value={health}
                        label="Health Check Rating"
                        onChange={(e) => setHealth(e.target.value)}
                    >
                        <MenuItem value={0}>0 -- Healthy</MenuItem>
                        <MenuItem value={1}>1 -- Low Risk</MenuItem>
                        <MenuItem value={2}>2 -- High Risk</MenuItem>
                        <MenuItem value={3}>3 -- Critical Risk</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleHealthSubmit}>Add</Button>
                <Button variant="outlined" onClick={onCancel}>Cancel</Button>
            </Stack>
        );
        } else {
            return null;
        }
    };

    const gender = () => {
        if (patient?.gender === 'female'){
            return <Female />;
        } else if (patient?.gender === 'male'){
            return <Male/>;
        } else {
            return null;
        }
    };

    const typeName = () => {
        if(type){
            return `${type}`;
        } else {
            return null;
        }
    };

    if (patient){

        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    
                    <h3>{patient.name}{gender()}</h3>
                    
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Ssn: {patient.ssn}</Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Occupation: {patient.occupation}</Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Date Of Birth: {patient.dateOfBirth}</Typography>
                    <div>
                        <h4>Entries</h4>
                    </div>
                    <div>
                        {patient.entries.map(e => (
                            <EntryDetails key={e.id} entries={e}/>
                        ))}
                        
                    </div>
                    <Button variant="contained" style={{display: visible}} onClick={handleAdd}>ADD NEW ENTRY</Button>
                    {showForm && 
                        <Box sx={{ border: '1px dashed #333',borderRadius: 1, p: 3,backgroundColor: '#fff'}}>
                            <Stack spacing={2}>
                                <h3>New {typeName()} Entry</h3>
                                {notifyMessage()}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Entry Type*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Entry Type"
                                        onChange={(e) => setType(e.target.value as EntryType)}
                                    >
                                        <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
                                        <MenuItem value={"OccupationalHealthcare"}>Occupational Health Care</MenuItem>
                                        <MenuItem value={"Hospital"}>Hospital</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField type="date" label="Date*" slotProps={{ inputLabel: { shrink: true } }} value={date} onChange={(e) => setDate(e.target.value)} />
                            
                            <TextField label="description*" value={description} onChange={(e) => setDescription(e.target.value)}/>
                                <TextField label="specialist*" value={specialist} onChange={(e) => SetSpecialist(e.target.value)}/>
                                <FormControl >
                                    <InputLabel >Chip</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={diagnosesCodes}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {diagnoses.map((d) => (
                                        <MenuItem
                                        key={d.name}
                                        value={d.code}
                                        >
                                        {d.code}-- {d.name}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                {hospitalEntryForm()}
                                {OccupationalEntryForm()}
                                {healthCheckEntryForm()}
                                
                            </Stack>
                            
                        </Box>
                        
                    }
                </CardContent>
            </Card>
    );
    } else {
        return (
            <h3>Can't provide details for this Patient!</h3>
        );
    }
    
};

export default PatientDetail;
import { Entry, HealthCheckRating } from "../../types";
import { Typography, Card , CardContent } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { purple, red } from "@mui/material/colors";

interface props {
    entries: Entry;
}

const EntryDetails = ({entries}: props) => {

    const assertNever = (x: never) : never => {
        throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
    };

    const icon = (t: Entry) => {
        if (t.type === "OccupationalHealthcare") {
            return <><WorkIcon /> {t.employerName}</>;
        }
        else if(t.type === "HealthCheck") {
            return <MedicalServicesIcon />;
        }
        else if(t.type === "Hospital"){
            return <LocalHospitalIcon />;
        }
        else {
            return null;
        }
    };

    const healthCheck = (h: HealthCheckRating) => {
        switch(h){
            case 0:
                return <FavoriteIcon sx={{ color: '#43a047' }} />;
                break;
            case 1:
                return <FavoriteIcon sx={{ color: '#fbc02d' }} />;
                break;
            case 2:
                return <FavoriteIcon sx={{ color: red }} />;
                break;
            case 3:
                return <FavoriteIcon sx={{ color: purple }} />;
                break;
            default:
                return assertNever(h);
        }
    };

    switch(entries.type){
        case "Hospital":
            return(
                <Card key={entries.id} variant="outlined" sx={{ minWidth: 275, mb: 2, borderColor: 'grey.500' }}>
                {/* p: 1.5 reduces inner padding; pb: 1.5 removes MUI's extra bottom padding */}
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                        {entries.date}{icon(entries)}
                        </Typography>
                        <Typography variant="body2">
                        {entries.description}--{entries.discharge.criteria}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                        Diagnose by {entries.specialist}
                        </Typography>
                    </CardContent>
                </Card>
            );
            break;
        case "OccupationalHealthcare":
            return(
                <Card key={entries.id} variant="outlined" sx={{ minWidth: 275, mb: 2, borderColor: 'grey.500' }}>
                {/* p: 1.5 reduces inner padding; pb: 1.5 removes MUI's extra bottom padding */}
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                        {entries.date}{icon(entries)}
                        </Typography>
                        <Typography variant="body2">
                        {entries.description}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                        Diagnose by {entries.specialist}
                        </Typography>
                    </CardContent>
                </Card>
            );
            break;
        case "HealthCheck":
            return(
                <Card key={entries.id} variant="outlined" sx={{ minWidth: 275, mb: 2, borderColor: 'grey.500' }}>
                {/* p: 1.5 reduces inner padding; pb: 1.5 removes MUI's extra bottom padding */}
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Typography variant="caption" display="block" color="text.secondary">
                        {entries.date}{icon(entries)}
                        </Typography>
                        <Typography variant="body2">
                        {entries.description}-
                        </Typography>
                        <Typography variant="body2">
                        {healthCheck(entries.healthCheckRating)}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                        Diagnose by {entries.specialist}
                        </Typography>
                    </CardContent>
                </Card>
            );
            break;
        default:
            return assertNever(entries);
    }
};

export default EntryDetails;
import React from "react";
import axios from "axios";
import { Container, Card, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient, assertNever } from "../types";
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../../back/src/types";
import { apiBaseUrl } from "../constants";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  
  React.useEffect(() => {
    if (patient && !patient.ssn) {
      const getPatient = async () => {
        try {
          const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
          dispatch(updatePatient(newPatient));
        } catch (error) {
          throw new Error('Something went wrong ' + error.message);
        }
      };
      getPatient();
    }
  }, [id, patient, dispatch]);

  if (!patient) {
    return <div>Loading patient...</div>;
  }

  const printIcon = () => {
    switch (patient.gender) {
      case 'male':
        return <Icon name="mars" size="large" />;
      case 'female':
        return <Icon name="venus" size="large" />;
      default:
        return <Icon name="genderless" size="large" />;
    }
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type){
      case 'Hospital':
        return <HospitalEntryDetails entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareEntryDetails entry={entry} />;
      case 'HealthCheck':
        return <HealthCheckEntryDetails entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            {' '}
            <Icon color='red' name='hospital symbol' />
          </Card.Header>
        </Card.Content>
        <Card.Content description={entry.description} />
        <Card.Content description={'Diagnosed by ' + entry.specialist} />
      </Card>
    );
  };

  const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            {' '}
            <Icon name='briefcase' />
            {entry.employerName}
          </Card.Header>
        </Card.Content>
        <Card.Content description={entry.description} />
        {(entry.sickLeave) && <Card.Content>{entry.sickLeave?.startDate} &mdash; {entry.sickLeave?.endDate}</Card.Content>}
        <Card.Content description={'Diagnosed by ' + entry.specialist} />
      </Card>
    );
  };
  
  const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            {entry.date}
            {' '}
            <Icon name='calendar check outline' />
          </Card.Header>
        </Card.Content>
        <Card.Content description={entry.description} />
        <Card.Content description={entry.healthCheckRating === 0 ? '💚' : '💛'} />
        <Card.Content description={'Diagnosed by ' + entry.specialist} />
      </Card>
    );
  };

  const printEntries = ( entries: Entry[] ) => {
    if (entries.length < 1){
      return <p>No entries found.</p>;
    }
    return (
      <>
        <h2>Entries</h2>
        {entries.map(e => (
          <EntryDetails key={e.id} entry={e} />
        ))}
      </>
    );
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{patient.name} {printIcon()}</h3>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        {patient.entries && printEntries(patient.entries)} 
      </Container>
    </div>
  );
};

export default PatientPage;

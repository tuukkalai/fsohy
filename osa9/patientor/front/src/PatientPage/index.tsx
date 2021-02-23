import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { updatePatient, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
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
        } catch (e) {
          throw new Error('Something went wrong ' + e.message);
        }
      };
      getPatient();
    }
  }, [patient, dispatch]);

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

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>{patient.name} {printIcon()}</h3>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </Container>
    </div>
  );
};

export default PatientPage;

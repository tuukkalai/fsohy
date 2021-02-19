import React from "react";
// import { Container, Table, Button } from "semantic-ui-react";

// import { Patient } from "../types";
// import { apiBaseUrl } from "../constants";
// import { useStateValue } from "../state";
import { useParams } from "react-router-dom";

const PatientPage: React.FC = () => {
  //const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="App">
     <p>{id}</p> 
    </div>
  );
};

export default PatientPage;

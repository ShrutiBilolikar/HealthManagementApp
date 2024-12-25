import axios from 'axios';
import { useState } from 'react';

export default function AddDetails () {
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState('');

  const fetchPatient = async () => {
    const response = await axios.get(`http://localhost:5000/patients/${patientId}`);
    console.log(response);
    setPatientData(response.data);
  };

  return (
    <div>
      <h1>Health Records</h1>
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={fetchPatient}>Fetch Records</button>
      {patientData && <pre>{JSON.stringify(patientData, null, 2)}</pre>}
    </div>
  );
};

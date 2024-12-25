import React, { useState } from "react";
import axios from "axios";

export default function AddPatientForm() {
  const [formData, setFormData] = useState({
    familyName: "",
    givenName: "",
    gender: "",
    birthDate: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    const patientData = {
      name: [
        {
          use: "official",
          family: formData.familyName,
          given: [formData.givenName],
        },
      ],
      gender: formData.gender,
      birthDate: formData.birthDate,
      resourceType: "Patient",
    };

    try {
      const result = await axios.post("http://localhost:5000/patients", patientData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setResponse(result.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Add New Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Family Name:</label>
          <input
            type="text"
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Given Name:</label>
          <input
            type="text"
            name="givenName"
            value={formData.givenName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Patient</button>
      </form>

      {response && (
        <div>
          <h3>Patient Added Successfully! Save ID for future reference!!</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div>
          <h3>Error Adding Patient:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

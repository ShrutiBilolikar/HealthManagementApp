const express = require("express");
// const connect = require("./db");
const jsonMiddleware = require("./middleware/jsonMiddleware")
const app = express();
const PORT = 5000;
const axios = require("axios"); 
const cors = require("cors");
const { Console } = require("console");

app.use(cors());
app.use(jsonMiddleware);
const GCP_BASE_URL = "https://healthcare.googleapis.com/v1";
const PROJECT_ID = "healthmanagementapp";
const DATASET = "my-dataset";
const FHIR_STORE = "my-fhir-store";

const getAccessToken = async () => {
  try {
    // const { stdout } = await import("child_process").then((childProcess) =>
    //   childProcess.execSync("gcloud auth print-access-token")
    // );
    // console.log(stdout);
    // return stdout.toString().trim();
    const childProcess = await import("child_process");
    const stdout = childProcess.execSync("gcloud auth print-access-token");
    return stdout.toString().trim();
  } catch (err) {
    console.error("Error fetching access token:", err.message);
    throw new Error("Failed to fetch access token");
  }
};

const addPatient = async (patientData) => {
  const accessToken = await getAccessToken();
  const url = `${GCP_BASE_URL}/projects/${PROJECT_ID}/locations/us-central1/datasets/${DATASET}/fhirStores/${FHIR_STORE}/fhir/Patient`;

  const response = await axios.post(url, patientData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/fhir+json",
    },
  });
  return response.data;
};

const getPatient = async (patientId) => {
  const accessToken = await getAccessToken();
  const url = `${GCP_BASE_URL}/projects/${PROJECT_ID}/locations/us-central1/datasets/${DATASET}/fhirStores/${FHIR_STORE}/fhir/Patient/${patientId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

// connect()
//   .then(() => {
//     console.log("Database connection successful");
//   })
//   .catch((err) => {
//     console.error("Database connection error:", err.message);
//     process.exit(1);
//   });

// app.get("/", (req, res) => {
//   res.send("Hello, MongoDB connection is successful!");
// });

app.post("/patients", async (req, res) => {
  try {
    const patientData = req.body; 
    const result = await addPatient(patientData);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error adding patient:", err.message);
    res.status(500).send("Failed to add patient");
  }
});

app.get("/patients/:id", async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientData = await getPatient(patientId);
    // console.log("*********************************************")
    res.status(200).json(patientData);
  } catch (err) {
    console.error("Error fetching patient:", err.message);
    res.status(500).send("Failed to fetch patient");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

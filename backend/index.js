const express = require("express");
const connect = require("./db");
const jsonMiddleware = require("./middleware/jsonMiddleware")
const app = express();
const PORT = 5000;

app.use(jsonMiddleware);

connect()
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Hello, MongoDB connection is successful!");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

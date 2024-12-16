const mongoose = require("mongoose");

async function connect() {
  const mongoUri =
    "mongodb+srv://shrutibilolikar2003:shrutibilolikar2003@cluster0.pnwyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  await mongoose.connect(mongoUri, { dbName: "Cluster0" });
  console.log(`MongoDB successfully connected to ${mongoUri}`);
}

module.exports = connect;

const config = require("config");
const dbURL = config.get("DB_URL");
const mongoose = require("mongoose");
const dbHandle = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(dbURL);
    console.log("Connected to database Successfully");
  } catch (error) {
    console.log(error);
    console.log("Error connecting to database");
    // throw new Error("Sorry There exists an error in the System");
    process.exit(0);
  }
};
module.exports = dbHandle;

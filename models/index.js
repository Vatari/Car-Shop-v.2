const mongoose = require("mongoose");
//const ENV = require("dotenv");
require("./Car");
require("./Accessory");
//ENV.config({ path: "./.env" });
console.log(process.env.DB_PASSWORD);
const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qfalkak.mongodb.net/car-shop2`;

async function init() {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    });

    console.log("Database connection established...");

    mongoose.connection.on("error", (err) => {
      console.error("Database error");
      console.error(err);
    });
  } catch (err) {
    console.log(err);
    console.error("Error connecting to database");
    process.exit(1);
  }
}

module.exports = init;

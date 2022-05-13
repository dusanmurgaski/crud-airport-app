const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const airportRoute = require("./routes/airport");
const airlineRoute = require("./routes/airline");
const countryRoute = require("./routes/country");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

dotenv.config();

app.use(cors(corsOptions));

// Connecting to a DB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/airports", airportRoute);
app.use("/api/airlines", airlineRoute);
app.use("/api/countries", countryRoute);

app.listen(5000, () => {
  console.log("backend server is running!");
});

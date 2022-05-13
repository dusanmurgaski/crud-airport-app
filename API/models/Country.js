const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  iso: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Country", CountrySchema);

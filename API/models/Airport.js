const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    airlines: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", AirportSchema);

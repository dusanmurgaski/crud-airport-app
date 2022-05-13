const Airport = require("../models/Airport");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/createairport", async (req, res) => {
  const newAirport = new Airport({
    name: req.body.name,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    airlines: req.body.airlines,
  });
  try {
    const savedAirport = await newAirport.save();
    res.status(201).json(savedAirport);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Airport.findByIdAndDelete(req.params.id);
    res.status(200).json("Airport has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedAirport = await Airport.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAirport);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const airports = await Airport.find();
    res.status(200).json(airports);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const airport = await Airport.findById(req.params.id);
    res.status(200).json(airport);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

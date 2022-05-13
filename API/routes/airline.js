const Airline = require("../models/Airline");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/createairline", async (req, res) => {
  const newAirline = new Airline({
    name: req.body.name,
    country: req.body.country,
  });
  try {
    const savedAirline = await newAirline.save();
    res.status(201).json(savedAirline);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Airline.findByIdAndDelete(req.params.id);
    res.status(200).json("Airline has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", async (req, res) => {
  try {
    const updatedAirline = await Airline.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAirline);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const airline = await Airline.find();
    res.status(200).json(airline);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/find/:id", async (req, res) => {
  try {
    const airline = await Airline.findById(req.params.id);
    res.status(200).json(airline);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

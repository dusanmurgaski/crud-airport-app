const Country = require("../models/Country");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/createcountry", async (req, res) => {
  const newCountry = new Country({
    iso: req.body.iso,
    name: req.body.name,
  });
  try {
    const savedCountry = await newCountry.save();
    res.status(201).json(savedCountry);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.status(200).json("Country has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", async (req, res) => {
  try {
    const country = await Country.find();
    res.status(200).json(country);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

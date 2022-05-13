const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

//DELETE ALL

router.delete("/deleteall", async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json("Users has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

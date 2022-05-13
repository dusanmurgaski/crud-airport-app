const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//   Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const email = await User.findOne({
      email: req.body.email,
    });
    if (email) {
      res.status(401).json("Email already exists!");
      return;
    }
    const user = await User.findOne({
      username: req.body.username,
    });
    if (user) {
      res.status(401).json("Username already exists!");
      return;
    }

    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );
    res.status(201).json({ savedUser, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//   Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      res.status(401).json("Wrong username");
      return;
    }
    const OriginalPassword = user.password;

    if (OriginalPassword !== req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

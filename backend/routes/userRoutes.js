const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// POSTING ROUTE /api/users/register (adding new user) "PUBLIC ACCESSING"

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    // CREATE JWT PAYLOAD
    const payload = { user: { id: user._id, role: user.role } };

    // SIGN AND RETURN THE TOKEN ALONG WITH USER DATA
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // SEND THE USER AND TOKEN IN RESPONSE
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

// POSTING ROUTE /api/users/login (authenticate user) "PUBLIC ACCESSING"
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ massage: "Wrong Email or Password" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ massage: "Wrong Email or Password" });

    // CREATE JWT PAYLOAD
    const payload = { user: { id: user._id, role: user.role } };

    // SIGN AND RETURN THE TOKEN ALONG WITH USER DATA
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // SEND THE USER AND TOKEN IN RESPONSE
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ROUTE GET /api/users/profile  GET LOGGED_IN USER'S PROFILE (PROTECTED ROUTE)

router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});
module.exports = router;

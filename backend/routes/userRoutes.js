const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

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
router.
module.exports = router;

const express = require("express");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ROUTE GET api/admin/users GET ALL USERS(ADMIN ONLY) (PRIVATE/ADMIN)
router.get("/", protect, admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ROUTE POST api/admin/users ADD A NEW USER (ADMIN ONLY) (PRIVATE/ADMIN)
router.post("/", protect, admin, async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    user = new User({ name, email, password, role: role || "customer" });
    await user.save();
    res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;

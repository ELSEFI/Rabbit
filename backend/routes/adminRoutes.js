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

// ROUTE PUT api/admin/users/:id UPDATE USER INFO (ADMIN ONLY) (PRIVATE/ADMIN)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User Not Founded" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({ message: "User Updated Successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ROUTE DELETE api/admin/users/:id DELETE USER (ADMIN ONLY) (PRIVATE/ADMIN)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User Not Founded" });

    await user.deleteOne();
    res.status(201).json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;

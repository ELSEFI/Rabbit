const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

// ROUTE POST api/subscribe HANDLE NEWSLETTER SUBSCRIPTION (PUBLIC)
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email Is Required" });

    let subscriber = await Subscriber.findOne({ email });
    if (subscriber)
      return res.status(400).json({ message: "Email Is Already Subscribed" });

    subscriber = new Subscriber({ email });
    await subscriber.save();

    res
      .status(201)
      .json({ message: "Successfully Subscribed To The Newsletter!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

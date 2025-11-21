const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();
// ROUTE GET /api/admin/orders GET ALL ORDERS (ADMIN ONLY) (PRIVATE/ADMIN)
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ROUTE PUT /api/admin/orders/:id UPDATE ORDER STATUS (ADMIN ONLY) (PRIVATE/ADMIN)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(400).json({ message: "Order Not Found" });

    order.status = req.body.status || order.status;
    order.isDelivered =
      req.body.status === "Delivered" ? true : order.isDelivered;
    order.deliveredAt =
      req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;

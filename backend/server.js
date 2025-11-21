const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
// === ROUTES === //
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
// === ROUTES === //

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// CONNECT TO DATABASE
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

// API ROUTES
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

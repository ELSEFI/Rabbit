const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
// === ROUTES === //
const userRoutes = require("./routes/userRoutes");
// === ROUTES === //

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

// CONNECT TO DATABASE
connectDB();

app.get("/", (req, res) => {
  res.send("WELCOME TO RABBIT API!");
});

// API ROUTES
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});

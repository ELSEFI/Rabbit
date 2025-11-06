const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo DB connected Successfully");
  } catch (err) {
    console.error("MongoDb connection failed", err);
    process.exit(1);
  }
};

module.exports = connectdb;

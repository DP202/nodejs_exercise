const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/excercise2");

    console.log("Connect DB Successful");
  } catch (error) {
    console.log("Connect DB Fail ", error);
  }
}

module.exports = connectDB;

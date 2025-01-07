const express = require("express");
const app = express();
const PORT = 8888;
const connectDB = require("./src/configs/database");
const routers = require("./src/routers");

app.use(express.json());

connectDB();

routers(app);

app.listen(PORT, () => {
  console.log("Server run Port : ", PORT);
});

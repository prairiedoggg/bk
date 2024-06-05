const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const libraryRoutes = require("./routes/libraryRoutes");

dotenv.config();

const app = express();

app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.wnsz2zq.mongodb.net/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use("/libraries", libraryRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

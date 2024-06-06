const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Library = require("./models/librarySchema");
const Park = require("./models/parkSchema");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.wnsz2zq.mongodb.net/${process.env.DB_NAME}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.static("public"));

app.get("/api/libraries", async (req, res) => {
  try {
    const libraries = await Library.find({});
    res.json(libraries);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/parks", async (req, res) => {
  try {
    const parks = await Park.find({});
    res.json(parks);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const dotenv = require("dotenv");
// dotenv.config();

const DB =
  "mongodb+srv://ahmadnishar1132:Nishar1132@cluster0.kj6kfgn.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connected..");
  })
  .catch((e) => {
    console.log("Error occurred ");
  });

app.listen(3000, () => {
  console.log("Server running..");
});

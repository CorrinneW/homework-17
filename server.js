const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// api routes
app.use(require("./routes/api.js"))

// nav html routes
app.use(require('./routes/navRoutes'))


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

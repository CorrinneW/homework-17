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

//routes for navigation
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '/public/exercise.html')));
app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '/public/stats.html')));

// api routes
app.use(require("./routes/api.js"))


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

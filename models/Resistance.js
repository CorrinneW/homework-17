const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for this exercise"
  },
  weight: {
    type: Number,
    default: 0
  },
  sets: {
    type: Number,
    default: 0
  },
  reps: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.exports = Resistance;

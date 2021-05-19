const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  date: {
    type: Date
  },
  duration: {
    type: Number,
    default: 0
  },
  exercises: {
    type: Number,
    default: 0
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
  distance: {
      type: Number,
      default: 0
  }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

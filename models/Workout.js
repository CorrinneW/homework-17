const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date()
  },
  exercise: [
    {
      name: {
        type: String,
        trim: true,
        required: "Enter a name for this exercise"
      },
      type: {
        type: String
      },
      distance: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      reps: {
        type: Number,
      },
    }
  ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;

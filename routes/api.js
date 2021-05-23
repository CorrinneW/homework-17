const router = require('express').Router();
const {Workout} = require('../models')

//create workout
router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err.message)
    })
})

//get all workouts
router.get('/api/workouts', async (req, res) => {
    try{
        const getWorkout = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" },
                    totalWeight: { $sum: "$exercises.weight" }
                }
            }
        ])
        res.json(getWorkout)
    }
    catch{
        res.status(400).json('error occured')
    }
})

//update current workout with new exercise
router.put('/api/workouts/:id', async (req, res) => {
    try{
       const newExercise = await Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}})
       res.json(newExercise)
    }
    catch{
        res.status(400).json('error occured')
    }
})

//get workouts from last 7 days

router.get('/api/workouts/range', async (req, res) => {
    //return workouts within date range
    try{
    
        const workoutRange = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: { $sum: "$exercises.duration" },
                    totalWeight: { $sum: "$exercises.weight" }
                }
            }
        ])
        .sort({day: -1})
        .limit(7)

        res.json(workoutRange)
        console.log(workoutRange)
    }
    catch{
        res.status(400).json('error occured')
    }
})

module.exports=router;
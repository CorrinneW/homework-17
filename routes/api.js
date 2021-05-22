const router = require('express').Router();
const {Workout, Exercise} = require('../models')

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
        const getWorkout = await Workout.find({})
        res.json(getWorkout)
    }
    catch(err){res.json(err.message)}
})

//update current workout with new exercise
router.put('/api/workouts/:id', async (req, res) => {
    try{
       const newExercise = await Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}})
       console.log(newExercise);
    }
    catch(err){
        res.json(err.message)
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

        console.log(workoutRange);
        return workoutRange
    }
    catch{
        res.status(400).json(err.message)
    }
})

module.exports=router;
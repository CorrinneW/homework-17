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

//update current workout
router.put('/api/workouts/:id', async (req, res) => {
    try{
       const newExercise = await Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}})
       console.log(newExercise);
    }
    catch(err){
        res.json(err.message)
    }
})

//aggregate all exercises in current workout

module.exports=router;
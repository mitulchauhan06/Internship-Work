import express from 'express' ;
import Task from '../models/Task.js'


const router = express.Router();


// get all tasks
router.get('/' , async (req , res) => {
    try{
        const tasks = await Task.find().lean();
res.json(tasks.map(task => ({ ...task, id: task._id })));
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

// create a new task
router.post('/' , async (req, res) => {
    try {
           console.log("Received priority:", req.body.priority);
    const newTask = new Task({
           title: req.body.title,
      priority: req.body.priority, // Ensure this is included
      status: req.body.status || "todo"
    
    });
       const savedTask = await newTask.save();
        console.log("Saved task:", savedTask);
    res.status(201).json({
          ...savedTask.toObject(),
  id: savedTask._id,
 
    });
    } catch (err) {
        console.error("Datadase error:", err);
        res.status(500).json({err: err.message});
    }
});


//delete a task
router.delete('/:id' , async (req , res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'Task deleted' , deletedId : req.params.id});
    } catch (err) {
        res.json({err : err.message} )
    }
})



export default router
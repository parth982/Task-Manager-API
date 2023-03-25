// Loaded a Mongoose Model for creating documents
const Task = require('../models/Task');
// Load custom MDW Func to Avoid try and catch 
const asyncWrapper = require('../middleware/async');
// Load Func to create Error instance from Custom Error Class.
const { createCustomError } = require('../errors/custom-error'); 


//? Using MDW 'asyncWrapper' instead try and catch block
const getAllTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({});
    res.status(200).json({tasks});
    // res.status(200).json({status: 'success',data:{allTasks,nbHits: allTasks.length}});
});

const createTask = asyncWrapper(async (req,res)=>{
    // Creating a Document from Task Schema using the requset body's properties
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

// We have two Error catching statements :
// 1) if(!task) => Handles error if user asked for Task with correct ID syntax like exact Num of chars that has to be in the _id but Task with that _id wasn't in the  Collection.
// 2) catch(err) inside the asyncWrapper MDW Func => Handles error if user asked for Task or document from the Model with Wrong syntax herer if wrong syntax for TaskID. 
const getTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return next(createCustomError(`No Task with ID as: ${taskID} is found`,404));
        }
        res.status(200).json({task}); 
});

//? Same as above in getTask we have 2 Error catching statements:
const deleteTask = asyncWrapper(async (req,res)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No Task with ID as: ${taskID} is found`,404));
        }
        res.status(200).json({task});
        // res.status(200).json({task: null, status: 'success'}); 
});

//? In Mongoose query findByIdAndUpdate() we needed to pass extra Options for it to work well.
// 1) (run:true) This tells to store the latest updated object in var 'task' if we do not pass this then even though Object gets updated but the 'task' variable still will have old value stored of the previous task.
// 2) (runValidators:true) This tells to use the Schema validators and take the, in consideration. Like (required:true, type:String etc..) as findByIdAndUpdate query by default doesn't take them in picture. So even if we pass empty string "" in req body it gets updated but only after specifying to use runValidators then it will throw error as it should.
const updateTask = async (req,res)=>{
        const{id: taskID} = req.params;
        const task = await Task.findByIdAndUpdate({_id: taskID},req.body,{
            new: true,
            runValidators: true,
            // overwrite:true 
            // If we use overwrite option then the unspecified updated properties in req body will be be deleted from that object and accordingly object will be updated.  
        });
        if(!task){
            return next(createCustomError(`No Task with ID as: ${taskID} is found`,404));
        }
        res.status(200).json({task});
};

module.exports = { 
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};


/*
? Without asyncWrapper but simple using try and catch block
! GET ALL TASKS
const getAllTasks = async (req,res)=>{
    try{
        const allTasks = await Task.find({});
        res.status(200).json({allTasks});
    }catch(err) {res.status(500).json({msg: err});}
}; 

! GET A SINGLE TASK
const getTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No Task with ID as: ${taskID} is found`});
        }
        res.status(200).json({task});
    }catch(err) {res.status(500).json({msg: err});}
};

! CREATE A TASK
const createTask = async (req,res)=>{
    try{
        const task_doc = await Task.create(req.body);
        res.status(201).json({task_doc});
    }catch(err) {res.status(500).json({msg: err});}
};


! DELETE A TASK
const deleteTask = async (req,res)=>{
    try{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg:`No Task with ID as: ${taskID} is found`});
        }
        res.status(200).json({task});
    }catch(err) {res.status(500).json({msg: err});}
};

! UPDATE A TASK USING PATCH
const updateTask = async (req,res)=>{
    try{
        const{id: taskID} = req.params;
        const task = await Task.findByIdAndUpdate({_id: taskID},req.body,{
            new:true,
            runValidators:true,
        });
        if(!task){
            return res.status(404).json({msg:`No Task with ID as: ${taskID} is found`});
        }
        res.status(200).json({task});
    }catch(err) {res.status(500).json({msg: err});}
};
*/
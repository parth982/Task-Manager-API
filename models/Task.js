// We are Creating Schemas for the documents that we will have inside our Collection by using mongoose.Schema().
const mongoose = require('mongoose');

// While Creating Documets from Schema which is what we are doing in controllers the newly created document will only contain those properties that are specified in Schema rest extra passed properties while creating document using Schema.create(_) will be ignored see in controllers/tasks.js
//? If we send field 'name' as empty in POST req then we will get Validation Error 
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must Provide Name cannot be Empty'],
        trim: true,
        maxlength: [20,'Name cannot be more than 20 chars']
    },
    completed:{
        type: Boolean,
        default: false
    }
});

// Created a Model named 'Task' using the 'TaskSchema' Belonging to Connected database 'TASK-MANAGER'
// Now using 'Task' as an Model we can create documets.
module.exports = mongoose.model('Task',TaskSchema);
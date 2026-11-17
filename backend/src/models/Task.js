import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    isCompleted:{
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
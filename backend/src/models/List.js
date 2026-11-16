import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.types.objectId,
        ref: 'User',
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.types.objectId,
            ref: 'Task'
        }
    ]
},{
    timestamps: true
});

const List = mongoose.model('List', listSchema);
module.exports = {
    List
};
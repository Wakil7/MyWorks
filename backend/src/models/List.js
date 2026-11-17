import mongoose from 'mongoose';

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
},{
    timestamps: true
});

const List = mongoose.model('List', listSchema);

export default List;
import mongoose from 'mongoose';
import List from '../models/List';
import Task from '../models/Task';

const addTask = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const userId = req.user.id;
        const {taskId} = req.params;

        const {name, description} = req.body;

        if (!name){
            await session.abortTransaction();
            session.endSession();
            res
            .status(400)
            .json({
                message: 'Name is required'
            })
        }

        const newTask = await Task.create({
            name,
            description,
            userId,
            isCompleted: false
        }, {session});


        const updatedList = await List.findOneAndUpdate(
            { _id:taskId, userId:userId}, 
            { $push: {tasks: newTask._id}},
            {new: true, session}
        );

        if (!updatedList){
            await session.abortTransaction();
            session.endSession();
            res
            .status(404)
            .json({
                message: 'List not found or you are not authorized'
            })
        }

        await session.commitTransaction();
        session.endSession();
        res
        .status(201)
        .json({
            message: 'Task added successfully',
            task: newTask,
            list: updatedList
        })
    }
    catch (err){
        await session.abortTransaction();
        session.endSession();
        res
        .status(500)
        .json({
            message: 'Error adding task',
            error: err.message
        });
    }
};

const deleteTask = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {listId, taskId} = req.params;
        const userId = req.user.id;

        const deletedTask = Task.findOneAndDelete({
            _id: taskId,
            userId: userId
        }, {session});

        if (!deletedTask){
            await session.abortTransaction();
            session.endSession();
            res
            .status(500)
            .json({
                message: 'Failed to delete task'
            })
        }

        await List.findByIdAndUpdate(
            listId,
            {
                $pull: {tasks: deletedTask._id}
            },
            {session}
        )

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            message: 'Task deleted successfully',
            task: deletedTask
        });

    }
    catch (err){
        await session.abortTransaction();
        session.endSession();
        res
        .status(500)
        .json({
            message: 'Failed to delete task',
            error: err.message
        })
    }
};

const updateTask = async(req, res) => {
    try{
        const userId = req.user.id;
        const {taskId} = req.params;

        const {name, description} = req.body;

        if (!name){
            req.status(400).json({
                message: 'Name is reqiured'
            });
        }

        const updatedTask = await Task.findOneAndUpdate({
                _id: taskId,
                userId: userId
            },
            {
                $set: {name:name, description:description}
            },
            {new: true, runValidators:true}
        );
        if (!updatedTask){
            res.status(404).json({
                message: 'Task not found or unauthorized'
            })
        }
        res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });
    }
    catch(err){
        res.json(500).json({
            message: 'Failed to update task',
            error: err.message
        })
    }
};

const toggleTaskCompleted = async(req, res) => {
    try{
        const userId = req.user.id;
        const {taskId} = req.params;

        const updatedTask = await Task.findOneAndUpdate({
            _id: taskId,
            userId: userId
        },
        [
            {
                $set: {
                    isCompleted: {$not: 'isCompleted'}
                }
            }
        ],
        {
            new: true
        });

        if (!updatedTask){
            res.status(404).json({
                message: 'Task not found or unauthorized'
            })
        }

        res.status(200).json({
            message: 'Task updated successfully'
        });
    }
    catch(err){
        res.status(500).json({
            message: 'Failed to update task',
            error: err.message
        })
    }
};


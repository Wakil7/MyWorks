import mongoose from 'mongoose';
import List from '../models/List.js';
import Task from '../models/Task.js';

const addTask = async (req, res) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    try {
        const userId = req.user.id;
        const { listId } = req.params;

        const { name, description } = req.body;


        if (!name) {
            // await session.abortTransaction();
            // session.endSession();
            return res.status(400).json({
                success: false,
                message: 'Name is required'
            })
        }

        const newTask = await Task.create({
            name,
            description,
            userId,
            isCompleted: false
        });

        // await newTask.save({ session });

        const updatedList = await List.findOneAndUpdate(
            { _id: listId, userId: userId },
            { $push: { tasks: newTask._id } },
            { 
                new: true, 
                // session 
            }
        );

        if (!updatedList) {
            // await session.abortTransaction();
            // session.endSession();
            return res.status(404).json({
                success: false,
                message: 'List not found or you are not authorized'
            })
        }

        // await session.commitTransaction();
        // session.endSession();
        return res.status(201).json({
            success: true,
            message: 'Task added successfully',
            task: newTask,
            list: updatedList
        })
    }
    catch (err) {
        // await session.abortTransaction();
        // session.endSession();
        return res.status(500).json({
            success: false,
            message: 'Error adding task',
            error: err.message
        });
    }
};

const deleteTask = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { listId, taskId } = req.params;
        const userId = req.user.id;

        const deletedTask = Task.findOneAndDelete({
            _id: taskId,
            userId: userId
        }, { session });

        if (!deletedTask) {
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({
                success: false,
                message: 'Failed to delete task'
            })
        }

        await List.findByIdAndUpdate(
            listId,
            {
                $pull: { tasks: deletedTask._id }
            },
            { session }
        )

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            task: deletedTask
        });

    }
    catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({
            success: false,
            message: 'Failed to delete task',
            error: err.message
        })
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;

        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is reqiured'
            });
        }

        const updatedTask = await Task.findOneAndUpdate({
            _id: taskId,
            userId: userId
        },
            {
                $set: { name: name, description: description }
            },
            { new: true, runValidators: true }
        );
        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or unauthorized'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask
        });
    }
    catch (err) {
        return res.json(500).json({
            success: false,
            message: 'Failed to update task',
            error: err.message
        })
    }
};

const toggleTaskCompleted = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.params;

        const updatedTask = await Task.findOneAndUpdate({
            _id: taskId,
            userId: userId
        },
            [
                {
                    $set: {
                        isCompleted: { $not: 'isCompleted' }
                    }
                }
            ],
            {
                new: true
            });

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found or unauthorized'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully'
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update task',
            error: err.message
        })
    }
};

export {
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompleted
};


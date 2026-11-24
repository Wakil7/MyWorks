import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskItem from '../components/Item';
import TaskDisplayModal from '../components/TaskDisplayModal';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmModal from '../components/ConfirmModal';
import TaskInputModal from '../components/TaskInputModal';

import {
    getList,
    addTask,
    deleteTask,
    updateTask,
} from '../features/data/taskSlice.js';

export default function Tasks(){

    const { listId } = useParams();

    const dispatch = useDispatch();

    const { tasks, loading, error } = useSelector((state)=>state.task);

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTaskDisplay, setShowTaskDisplay] = useState(false);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [isEditTask, setIsEditTask] = useState(false);

    const [taskData, setTaskData] = useState({
        name: '',
        description: ''
    });

    useEffect(()=>{
        if (listId){
            dispatch(getList({listId}));
        }
    }, [listId]);

    const handleDeleteClick = (e, taskId) => {
        e.stopPropagation();
        setSelectedTaskId(taskId);
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = () => {
        dispatch(deleteTask({listId, taskId: selectedTaskId}));
        setSelectedTaskId(null);
        setShowDeleteModal(false);
    }

    const handleCancelDelete = () =>{
        setSelectedTaskId(null);
        setShowDeleteModal(false);
    }

    const handleInputChange = (e) => {
        setTaskData({...taskData, [e.target.name]:e.target.value});
    }

    const handleAddClick = () => {
        setIsEditTask(false);
        setTaskData({name: '', description: ''});
        setShowTaskModal(true);
    }

    const handleEditClick = (e, task) => {
        e.stopPropagation();
        setIsEditTask(true);
        setSelectedTaskId(task._id);
        setTaskData({name: task.name, description: task.description});
        setShowTaskModal(true);
    }

    const handleConfirmTask = () => {
        if (isEditTask){
            dispatch(updateTask({...taskData, taskId: selectedTaskId}));
        }
        else{
            dispatch(addTask({...taskData, listId}));
        }
        setSelectedTaskId(null);
        setTaskData({name: '', description: ''});
        setIsEditTask(false);
        setShowTaskModal(false);
    }

    const handleCancelTask = () => {
        setSelectedTaskId(null);
        setTaskData({name: '', description: ''});
        setIsEditTask(false);
        setShowTaskModal(false);
    }

    const handleTaskClick = (e, task) => {
        setSelectedTaskId(task._id);
        setTaskData({name: task.name, description: task.description});
        setShowTaskDisplay(true);
    }

    const handleTaskDisplayCancel = () => {
        setSelectedTaskId(null);
        setTaskData({name: '', description: ''});
        setShowTaskDisplay(false);
    }

    return (
        <div className="container-fluid py-5">

            <div className="container">
                
                <PrimaryButton onClick={handleAddClick}>
                   Add
                </PrimaryButton>
            </div>

            <h2 className="text-center mb-4">
                Tasks
            </h2>

            <div className="lists-container">

                {tasks.map((task, index) => (
                    <TaskItem
                        key={task._id}
                        taskId={task._id}
                        number={index + 1}
                        name={task.name}
                        onEdit={(e) => handleEditClick(e, task)}
                        onDelete={(e) => handleDeleteClick(e, task._id)}
                        onClick={(e)=> handleTaskClick(e, task)}
                    />
                ))}

                {tasks.length === 0 && (
                    <p className="text-center text-muted mt-5">
                        No lists available.
                    </p>
                )}

            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete Task?"
                message="Do you want to delete this task? This action cannot be undone"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            ></ConfirmModal>

            

            <TaskInputModal
                isOpen={showTaskModal}
                title="Edit Task"
                onConfirm={handleConfirmTask}
                onCancel={handleCancelTask}
                inputOnChange={handleInputChange}
                inputValue={taskData}
            ></TaskInputModal>

            <TaskDisplayModal
                isOpen={showTaskDisplay}
                taskData={taskData}
                onCancel={handleTaskDisplayCancel}
            ></TaskDisplayModal>

        </div>
    );
}
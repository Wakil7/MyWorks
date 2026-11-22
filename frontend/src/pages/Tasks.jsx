import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskItem from '../components/Item.jsx';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmModal from '../components/ConfirmModal';
import ListEditModal from '../components/ListEditModal'
import {
    getList,
    addTask,
    deleteTask,
    updateTask,
    toggleCompleted
} from '../features/data/taskSlice.js';

export default function Tasks(){

    const { listId } = useParams();

    const dispatch = useDispatch();

    const { tasks, loading, error } = useSelector((state)=>state.task);

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(()=>{
        if (listId){
            dispatch(getList({listId}));
        }
    }, [listId]);

    const handleDeleteClick = (taskId) => {
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



    return (
        <div className="container-fluid py-5">

            <div className="container">
                {/* <TextInput
                    label="Add List"
                    placeholder="Type your list name here"
                    value = {listName}
                    onChange = {handleInputChange}
                />
                <PrimaryButton onClick={handleAddList}>
                    Add
                </PrimaryButton> */}
            </div>

            <h2 className="text-center mb-4">
                Tasks
            </h2>

            <div className="lists-container">

                {tasks.map((task, index) => (
                    <TaskItem
                        key={task._id}
                        number={index + 1}
                        name={task.name}
                        onEdit={() => handleEditClick(task._id, task.name)}
                        onDelete={() => handleDeleteClick(task._id)}
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

            {/*

            <ListEditModal
                isOpen={showEditModal}
                title="Edit List"
                onConfirm={handleConfirmEdit}
                onCancel={handleCancelEdit}
                inputOnChange={handleEditInputChange}
                inputValue={editListName}
            ></ListEditModal> */}

        </div>
    );
}
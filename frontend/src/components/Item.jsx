import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompleted } from '../features/data/taskSlice.js'

export default function Item({taskId, number, name, onEdit, onDelete, onClick }) {

    const dispatch = useDispatch();
    const task = useSelector(state=>state.task.tasks.find(t=>t._id==taskId));
    const isCompleted = task?.isCompleted ?? false;

    const handleToggleCompleted = () => {
        dispatch(toggleCompleted({taskId}));
    }

    return (
        <div className="list-item d-flex align-items-center justify-content-between" onClick={onClick}>

            <div className="d-flex align-items-center gap-4">
                <span className="list-number">{number}.</span>
                <span className="list-name">{name}</span>
            </div>

            <div className="d-flex align-items-center gap-3">
                {taskId?(
                <div className="form-field">
                    <input type="checkbox" id="checksuccess" className="check theme-success" checked={isCompleted} onChange={handleToggleCompleted} onClick={e=>e.stopPropagation()}/>
                </div>
                ):null}

                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={onEdit}
                    title="Edit List"
                >
                    <i className="bi bi-pencil-square"></i>
                </button>

                <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={onDelete}
                    title="Delete List"
                >
                    <i className="bi bi-trash"></i>
                </button>

            </div>

        </div>
    );
}

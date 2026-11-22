
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListItem from '../components/Item.jsx';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmModal from '../components/ConfirmModal';
import ListEditModal from '../components/ListEditModal'
import {
    getAllLists,
    addList,
    changeListName,
    deleteList
} from '../features/data/listSlice.js';

export default function Lists() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { lists, loading, error } = useSelector((state) => state.list);

    const [listName, setListName] = useState("");
    const [selectedListId, setSelectedListId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editListName, setEditListName] = useState("");

    useEffect(()=>{
        dispatch(getAllLists());
    }, []);


    // useEffect(() => {
    //     console.log(user);
    // }, [user]);

    useEffect(()=>{
        console.log(error);
    }, [error]);

    // const [lists, setLists] = useState([
    //     { id: 1, name: 'Shopping List' },
    //     { id: 2, name: 'Work Tasks' },
    //     { id: 3, name: 'Personal Goals' },
    //     { id: 4, name: 'Travel Plans' },
    //     { id: 5, name: 'Daily Tasks' }
    // ]);

    const handleOnListClick = (listId) => {
        navigate(`/tasks/${listId}`);
    }

    const handleEditClick = (listId, name) => {
        // console.log("Edit List:", id);
        setSelectedListId(listId);
        setEditListName(name);
        setShowEditModal(true);
    };

    const handleConfirmEdit = () => {
        dispatch(changeListName({listId: selectedListId, name: editListName}));
        setSelectedListId(null);
        setEditListName("");
        setShowEditModal(false);
    }

    const handleCancelEdit = () => {
        setSelectedListId(null);
        setEditListName("");
        setShowEditModal(false);
    }

    const handleDeleteClick = (listId) => {
        setSelectedListId(listId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = ()=>{
        dispatch(deleteList({listId: selectedListId}));
        setSelectedListId(null);
        setShowDeleteModal(false);
    }

    const handleCancelDelete = ()=>{
        setSelectedListId(null);
        setShowDeleteModal(false);
    }

    const handleInputChange = (e) => {
        setListName(e.target.value);
    }

    const handleEditInputChange = (e) => {
        setEditListName(e.target.value);
    }

    const handleAddList = async()=>{
        dispatch(addList({name: listName}));
        setListName("");
    }

    return (
        <div className="container-fluid py-5">

            <div className="container">
                <TextInput
                    label="Add List"
                    placeholder="Type your list name here"
                    value = {listName}
                    onChange = {handleInputChange}
                />
                <PrimaryButton onClick={handleAddList}>
                    Add
                </PrimaryButton>
            </div>

            <h2 className="text-center mb-4">
                My Lists
            </h2>

            <div className="lists-container">

                {lists.map((list, index) => (
                    <ListItem
                        key={list._id}
                        number={index + 1}
                        name={list.name}
                        onEdit={() => handleEditClick(list._id, list.name)}
                        onDelete={() => handleDeleteClick(list._id)}
                        onClick={() => handleOnListClick(list._id)}
                    />
                ))}

                {lists.length === 0 && (
                    <p className="text-center text-muted mt-5">
                        No lists available.
                    </p>
                )}

            </div>

            <ConfirmModal
                isOpen={showDeleteModal}
                title="Delete List?"
                message="Do you want to delete this list? This action cannot be undone"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            ></ConfirmModal>

            <ListEditModal
                isOpen={showEditModal}
                title="Edit List"
                onConfirm={handleConfirmEdit}
                onCancel={handleCancelEdit}
                inputOnChange={handleEditInputChange}
                inputValue={editListName}
            ></ListEditModal>

        </div>
    );
}

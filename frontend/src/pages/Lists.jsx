import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListItem from '../components/Item';
import PrimaryButton from '../components/PrimaryButton';
import ConfirmModal from '../components/ConfirmModal';
import ListInputModal from '../components/ListInputModal.jsx'
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
    const [showListModal, setShowListModal] = useState(false);
    const [isEditList, setIsEditList] = useState(false);


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

    const handleEditClick = (e, listId, name) => {
        // console.log("Edit List:", id);
        e.stopPropagation();
        setIsEditList(true);
        setSelectedListId(listId);
        setListName(name);
        setShowListModal(true);
    };

    const handleConfirmList = () => {
        if (isEditList){
            dispatch(changeListName({listId: selectedListId, name: listName}));
        }
        else{
            dispatch(addList({name: listName}));
        }
        setSelectedListId(null);
        setListName("");
        setIsEditList(false);
        setShowListModal(false);
    }

    const handleCancelList = () => {
        setSelectedListId(null);
        setListName("");
        setIsEditList(false);
        setShowListModal(false);
    }

    const handleDeleteClick = (e, listId) => {
        e.stopPropagation();
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


    const handleAddClick = async()=>{
        setIsEditList(false);
        setListName("");
        setShowListModal(true);
    }

    return (
        <div className="container-fluid py-5">

            <div className="container">
                {/* <TextInput
                    label="Add List"
                    placeholder="Type your list name here"
                    value = {listName}
                    onChange = {handleInputChange}
                /> */}
                <PrimaryButton onClick={handleAddClick}>
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
                        onEdit={(e) => handleEditClick(e, list._id, list.name)}
                        onDelete={(e) => handleDeleteClick(e, list._id)}
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

            <ListInputModal
                isOpen={showListModal}
                title={isEditList? "Edit List": "Add List"}
                onConfirm={handleConfirmList}
                onCancel={handleCancelList}
                inputOnChange={handleInputChange}
                inputValue={listName}
            ></ListInputModal>


        </div>
    );
}

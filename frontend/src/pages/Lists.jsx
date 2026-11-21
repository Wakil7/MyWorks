
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import TextInput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import {
    getAllLists,
    addList,
    changeListName,
    deleteList
} from '../features/data/listSlice.js';

export default function Lists() {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { lists, loading, error } = useSelector((state) => state.list)

    const [listName, setListName] = useState("");

    useEffect(()=>{
        dispatch(getAllLists());
    }, []);


    useEffect(() => {
        console.log(user);
    }, [user]);

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

    const handleEdit = (listId) => {
        // console.log("Edit List:", id);
    };

    const handleDelete = (listId) => {
        dispatch(deleteList({listId}));
    };

    const handleInputChange = (e) => {
        setListName(e.target.value);
    }

    const handleAddList = async()=>{
        dispatch(addList({name: listName}));
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
                        onEdit={() => handleEdit(list._id)}
                        onDelete={() => handleDelete(list._id)}
                    />
                ))}

                {lists.length === 0 && (
                    <p className="text-center text-muted mt-5">
                        No lists available.
                    </p>
                )}

            </div>

        </div>
    );
}


import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from '../components/ListItem';

export default function Lists() {

    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);


    useEffect(()=>{
        console.log(user);
    }, [user]);

    const [lists, setLists] = useState([
        { id: 1, name: 'Shopping List' },
        { id: 2, name: 'Work Tasks' },
        { id: 3, name: 'Personal Goals' },
        { id: 4, name: 'Travel Plans' },
        { id: 5, name: 'Daily Tasks' }
    ]);

    const handleEdit = (id) => {
        console.log("Edit List:", id);
    };

    const handleDelete = (id) => {
        setLists(lists.filter(list => list.id !== id));
    };

    return (
        <div className="container-fluid py-5">

            <h2 className="text-center mb-4">
                My Lists
            </h2>

            <div className="lists-container">

                {lists.map((list, index) => (
                    <ListItem
                        key={list.id}
                        number={index + 1}
                        name={list.name}
                        onEdit={() => handleEdit(list.id)}
                        onDelete={() => handleDelete(list.id)}
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

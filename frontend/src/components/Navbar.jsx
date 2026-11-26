import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice.js';


export default function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        try{
            dispatch(logoutUser());
            navigate("/login");
        }
        catch (err){
            console.log(err);
        }
    }


    return (
        <nav className="navbar navbar-expand-md bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    My Works
                </Link>

                <div className="dropdown ms-auto">
                    <button
                        className="btn p-0 border-0"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <img
                            src="https://ui-avatars.com/api/?name=Wakil&background=0D6EFD&color=fff"
                            alt="Profile"
                            width="40"
                            height="40"
                            className="rounded-circle"
                        />
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <Link className="dropdown-item" to="/profile">
                                <i className="bi bi-person me-2"></i>
                                Edit Profile
                            </Link>
                        </li>

                        <li><hr className="dropdown-divider" /></li>

                        <li>
                            <button className="dropdown-item text-danger" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

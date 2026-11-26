import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { updateProfile } from '../features/auth/authSlice.js';

export default function Profile() {

    const dispatch = useDispatch();
    
    const { user } = useSelector(state=>state.auth);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        bestFriendName: '' 
    });


    useEffect(()=>{
        setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            bestFriendName: user.bestFriendName
        });
    }, [user]);

    const handleChange = (e) => {
        setUserData(prevData=>{
            return {...prevData, [e.target.name]:e.target.value}
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            dispatch(updateProfile(userData));
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow border-0">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="text-center mb-2">
                                Edit Profile
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="First Name"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={userData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FormInput
                                            label="Last Name"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={userData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={user.email}
                                    readOnly={true}
                                />

                                
                                <FormInput
                                    label="Best Friend's Name"
                                    name="bestFriendName"
                                    placeholder="Enter your best friend's name"
                                    value={userData.bestFriendName}
                                    onChange={handleChange}
                                />

                                <PrimaryButton type="submit">
                                    Save
                                </PrimaryButton>

                            </form>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

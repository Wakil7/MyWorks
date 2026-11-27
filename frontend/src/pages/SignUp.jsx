
import { useState } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import axiosInstance from '../api/axiosInstance.js';
import { useToast } from '../components/CustomToast';

export default function SignUp() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bestFriendName: ''
    });

    const navigate = useNavigate();

    const showToast = useToast();

    const onChange = (e) => {
        setFormData((prevData)=>{
            return {...prevData, [e.target.name]:e.target.value};
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(formData);

        try{
            const response = await axiosInstance.post('/user/register', formData);
            showToast(response.data.message, "success");
            navigate('/login');
        }
        catch (error){
            showToast(error.response?.data?.message || "Sign up failed");
        }

    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow border-0">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="text-center mb-2">
                                Create Account
                            </h2>

                            <p className="text-muted text-center mb-4">
                                Sign up to get started
                            </p>

                            <form onSubmit = {handleSubmit}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="First Name"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={formData.firstName}
                                            onChange={onChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FormInput
                                            label="Last Name"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={formData.lastName}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={onChange}
                                />

                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={onChange}
                                />

                                <hr className="my-4" />

                                <h6 className="mb-3">
                                    Account Recovery
                                </h6>

                                <FormInput
                                    label="Best Friend's Name"
                                    name="bestFriendName"
                                    placeholder="Enter your best friend's name"
                                    value={formData.bestFriendName}
                                    onChange={onChange}
                                />

                                <PrimaryButton type="submit">
                                    Create Account
                                </PrimaryButton>

                            </form>

                            <p className="text-center mt-4 mb-0">
                                Already have an account?{' '}
                                <Link href="/login" className="text-decoration-none">
                                    Login
                                </Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

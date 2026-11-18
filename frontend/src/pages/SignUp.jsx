
import { useState } from 'react';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function Signup() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bestFriendName: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Signup Data:", formData);

        // Later, send this data to the backend API
    };

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

                            <form onSubmit={handleSubmit}>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="First Name"
                                            name="firstName"
                                            placeholder="Enter first name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <FormInput
                                            label="Last Name"
                                            name="lastName"
                                            placeholder="Enter last name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />

                                <PrimaryButton>
                                    Create Account
                                </PrimaryButton>

                            </form>

                            <p className="text-center mt-4 mb-0">
                                Already have an account?{' '}
                                <a href="/login" className="text-decoration-none">
                                    Login
                                </a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

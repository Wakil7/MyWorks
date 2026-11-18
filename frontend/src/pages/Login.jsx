
import { useState } from 'react';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Login Data:", formData);

        // Later, send this data to the backend API
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow border-0">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="text-center mb-2">
                                Welcome Back
                            </h2>

                            <p className="text-muted text-center mb-4">
                                Login to your account
                            </p>

                            <form onSubmit={handleSubmit}>

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
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />

                                <div className="text-end mb-3">
                                    <a
                                        href="/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <PrimaryButton>
                                    Login
                                </PrimaryButton>

                            </form>

                            <p className="text-center mt-4 mb-0">
                                Don't have an account?{' '}
                                <a
                                    href="/signup"
                                    className="text-decoration-none"
                                >
                                    Sign Up
                                </a>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

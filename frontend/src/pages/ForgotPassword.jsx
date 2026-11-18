
import { useState } from 'react';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function ForgotPassword() {

    const [formData, setFormData] = useState({
        email: '',
        bestFriendName: '',
        newPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Password Reset Data:", formData);

        // Later, send this data to the backend API
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">

                    <div className="card shadow border-0">
                        <div className="card-body p-4 p-md-5">

                            <h2 className="text-center mb-2">
                                Reset Password
                            </h2>

                            <p className="text-muted text-center mb-4">
                                Verify your identity and create a new password
                            </p>

                            <form onSubmit={handleSubmit}>

                                <FormInput
                                    label="Email Address"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your registered email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    label="Best Friend's Name"
                                    type="text"
                                    name="bestFriendName"
                                    placeholder="Enter your best friend's name"
                                    value={formData.bestFriendName}
                                    onChange={handleChange}
                                />

                                <FormInput
                                    label="New Password"
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter your new password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />

                                <PrimaryButton>
                                    Update Password
                                </PrimaryButton>

                            </form>

                            <p className="text-center mt-4 mb-0">
                                Remember your password?{' '}
                                <a
                                    href="/login"
                                    className="text-decoration-none"
                                >
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


import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../features/auth/authSlice.js';
import {useNavigate, Link} from 'react-router-dom';
// import api from '../api/axiosInstance.js'
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {loading, error} = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        email: '',
        password: '' 
    });

    const onChange = (e) => {
        setFormData((prevData)=>{
            return {...prevData, [e.target.name]:e.target.value};
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            await dispatch(
                loginUser(formData)
            ).unwrap();
            navigate("/", {replace: true});
        }
        catch (err){
            console.error(err);
        }
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
                                    onChange={onChange}
                                />

                                <FormInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={onChange}
                                />

                                <div className="text-end mb-3">
                                    <a
                                        href="/forgot-password"
                                        className="text-decoration-none"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <PrimaryButton type="submit">
                                    Login
                                </PrimaryButton>

                            </form>

                            <p className="text-center mt-4 mb-0">
                                Don't have an account?{' '}
                                <Link to="/signup"
                                    className="text-decoration-none"
                                >
                                    Sign Up
                                </Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

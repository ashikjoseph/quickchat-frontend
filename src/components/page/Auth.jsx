import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signupAPI, loginAPI } from '../services/allAPI'; 
import GenderCheck from './GenderCheck'; 
import authImage from '../assets/auth2.png'; 
import { isAuthTokenContext } from '../context/AuthContext';

function Auth({ register }) {
    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullname: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (gender) => {
        setFormData({ ...formData, gender });
    };

    // Handle Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        const { fullname, username, password, confirmPassword, gender } = formData;

        if (!username || !password || !fullname || !gender) {
            toast.error('Please fill the form completely!');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Password mismatch');
            return;
        }

        try {
            setLoading(true);
            const result = await signupAPI(formData); 
            if (result.status === 200) {
                toast.success('User registered successfully');
                setFormData({
                    fullname: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                });
                navigate('/login');
            } else {
                toast.error(result.response.data);
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            toast.error('Please fill the form completely!');
            return;
        }

        try {
            setLoading(true);
            const result = await loginAPI({ username, password }); // Handle login
            if (result.status === 200) {
                sessionStorage.setItem('user', JSON.stringify(result.data.user));
                sessionStorage.setItem('token', result.data.token);
                setIsAuthToken(true)
                toast.success('User logged in successfully');
                navigate('/msg');
            } else {
                toast.error(result.response.data);
            }
        } catch (error) {
            toast.error('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-6">
            <div className="w-full max-w-4xl flex items-center bg-white rounded-lg shadow-xl p-8 md:p-12">
                {/* Image Section */}
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <img src={authImage} alt="Authentication" className="w-full h-auto rounded-lg shadow-lg" />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 px-4 md:px-8">
                    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">{register ? 'Sign Up' : 'Log In'} Now</h2>
                    <form onSubmit={register ? handleRegister : handleLogin}>
                        {register && (
                            <div className="mb-4">
                                <label htmlFor="fullname" className="block text-sm font-medium text-gray-600">Fullname</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    placeholder="Enter your fullname"
                                    value={formData.fullname}
                                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                required
                            />
                        </div>
                        {register && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <GenderCheck onCheckboxChange={handleCheckboxChange} selectedGender={formData.gender} />
                                </div>
                            </>
                        )}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
                            disabled={loading}
                        >
                            {loading ? (register ? 'Signing up...' : 'Logging in...') : (register ? 'Sign up' : 'Log in')}
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            {register ? (
                                <>
                                    Already have an account?{' '}
                                    <a href="/login" className="text-indigo-600 hover:text-indigo-800">Login here</a>
                                </>
                            ) : (
                                <>
                                    Don't have an account?{' '}
                                    <a href="/register" className="text-indigo-600 hover:text-indigo-800">Create account</a>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;

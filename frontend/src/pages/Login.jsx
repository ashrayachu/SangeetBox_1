import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from '@mui/icons-material/Google';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userAuth';
const API_URL = import.meta.env.VITE_API_URL;


const Login = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            console.error("Please fill all fields"); // Replace with toast.error if using a toast library
            return;
        }
        console.log("Dispatching login action with:", formData);
        dispatch(login(formData));
    };
    
    const handleGoogleAuth = () => {
        window.open(`${API_URL}/auth/login/google/callback`, "_self");
        // window.open(`http://localhost:5000/auth/login/google/callback`, "_self");

    };  

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                <button 
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 mb-6 hover:bg-gray-50 transition-colors"
                    onClick={handleGoogleAuth}
                >
                    <span className='bg-red-400 p-2 rounded-full'>
                        <GoogleIcon className='text-white' />
                    </span>
                    <span className="text-gray-700">Log in with Google</span>
                </button>

                <div className="flex items-center gap-2 mb-6">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?
                        <Link to="/register" className="text-blue-600 font-medium ml-1 hover:underline">
                            Sign up for Free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

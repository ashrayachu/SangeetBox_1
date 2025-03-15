import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from '../assets/sangeeth-logo-bg.png'

import { googleAuth, logout } from "../redux/slices/userAuth";
import {
    Bell,
    Home,
    Globe,
    Search,
} from "lucide-react"


const Navbar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDoc = useSelector((state) => state.auth?.userDoc);



    useEffect(() => {
        dispatch(googleAuth())
    }, [dispatch]);
    console.log("userDoc", userDoc)

    const handleLogout = () => {
        dispatch(logout())
    }

    const handleSearch = () => {
        if (query && userDoc?.user) {
            navigate(`/search/${query}`);
        }
        else {
            alert("Please login and enter a search query")
        }
    };

    return (
        <div className="sticky top-0 bg-black bg-opacity-90 p-4 flex z-50 justify-between items-center gap-4">
            <div className="hidden md:flex">
                <button className="bg-black rounded-full p-1">
                    <img src={logo} alt="logo" className="w-10 h-10" />
                </button>
            </div>
            <div className="flex gap-2 w-[450px] items-center">
                <div className='bg-neutral-700 rounded-full p-2'>
                    <Home className="h-6 w-6 text-white hover:text-white" onClick={() => navigate('/')} />
                </div>
                <div className="bg-neutral-700 rounded-full w-full flex items-center gap-2 px-4 py-2 ">
                    <Search className="h-5 w-5 text-white" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="border-none outline-none text-white w-full"
                        placeholder="What do you want to listen to?"
                    />
                    <Globe className="h-5 w-5 text-white" onClick={handleSearch} />
                </div>

            </div>
            {userDoc ? (
                <div className='hidden md:flex justify-center items-center gap-4'>
                    <span className="text-white">Hey, {userDoc?.user?.name}</span>

                    <button onClick={handleLogout}
                        className="bg-white text-black rounded-full cursor-pointer px-4 py-1 font-semibold text-sm">Logout</button>

                </div>
            ) : (
                < div className='hidden md:flex gap-4 justify-center items-center' >
                    <button className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">
                        <Link to='/login'>Login</Link>
                    </button>
                </div >
            )}

        </div >
    );
}

export default Navbar;
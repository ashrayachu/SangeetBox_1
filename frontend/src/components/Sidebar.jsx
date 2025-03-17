import React, { useState } from 'react';
import {
    ChevronRight,
    Library,
} from "lucide-react"
import { logout } from "../redux/slices/userAuth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";



const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const userDoc = useSelector((state) => state.auth?.userDoc);
    const handleLogout = () => {
        dispatch(logout())
    }
    const navigate = useNavigate()

    return (
        <>
            <div className="hidden w-[420px] bg-black  p-2 md:flex flex-col gap-2 min-h-screen ">
                <div className="bg-neutral-900 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 text-white mb-4">
                        <Library className="h-6 w-6" />
                        <span className="font-semibold">Your Library</span>
                    </div>
                </div>
                {/* Scrollable Content */}
                <div className="flex-1 bg-neutral-900 rounded-lg overflow-y-auto max-h-[calc(100vh-150px)]">
                    {/* Library Items */}
                    {/* <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer"> */}
                    {/* <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white">❤️</span>
                            </div>
                            <div>
                                <div className="font-semibold text-white">Liked Songs</div>
                                <div className="text-sm text-neutral-400">Playlist • 28 songs</div>
                            </div>
                        </div> */}
                    {/* </div> */}
                    {/* Duplicate this block multiple times to test scrolling */}
                    <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer"
                        onClick={() => navigate('/tracks')}>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white">🎵</span>
                            </div>
                            <div>
                                <div className="font-semibold text-white"> Dashboard Songs</div>
                                <div className="text-sm text-neutral-400">Playlist • 50 songs</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:hidden fixed z-50 ">
                {/* Open Button (Hidden when isOpen is true) */}
                {!isOpen && (
                    <button
                        className="fixed top-20 left-2 bg-white p-4 rounded-full text-black z-50"
                        onClick={() => setIsOpen(true)}
                    >
                        <ChevronRight />
                    </button>
                )}

                {/* Sidebar Overlay */}
                {isOpen && (
                    <div className="fixed inset-0  bg-opacity-50 flex justify-start z-50">
                        {/* Sidebar Content */}
                        <div className="w-[350px] min-h-screen flex flex-col bg-neutral-800 text-white shadow-lg p-6 relative">
                            {/* Close Button */}
                            <div className='flex w-full justify-between mb-10'>
                                {userDoc ? (
                                    <div className=' flex flex-col gap-2 justify-center items-center'>
                                        <span className='text-white'>Hey, {userDoc?.user?.name}</span>
                                        <button onClick={handleLogout}
                                            className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">Logout</button>
                                    </div>
                                ) : (
                                    <div className=' flex flex-col gap-2 justify-center items-center'>
                                        <button className="bg-white text-black rounded-full px-4 py-1 font-semibold text-sm">
                                            <Link to='/login'>Login</Link>
                                        </button>
                                    </div>
                                )}

                                <button
                                    className="bg-red-500 text-white h-10 px-2 rounded"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                            <div>
                                {/* <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white">❤️</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold">Liked Songs</div>
                                            <div className="text-sm text-neutral-400">Playlist • 28 songs</div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="p-2 hover:bg-neutral-800 rounded-lg cursor-pointer"
                                    onClick={() => navigate('/tracks')}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white">🎵</span>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white"> Dashboard Songs</div>
                                            <div className="text-sm text-neutral-400">Playlist • 50 songs</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
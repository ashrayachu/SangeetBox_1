
import FeaturedSongs from '../components/FeaturedSongs';
import Category from '../components/Category';


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth } from "../redux/slices/userAuth";
import { Link } from 'react-router-dom'


const Home = () => {
    const dispatch = useDispatch();

    // Fetch Songs & Playlists on Page Load
    
    return (
        <div className="text-white bg-black p-1 md:p-2 min-h-screen flex flex-col gap-10">
            <div className="relative w-full h-[350px] overflow-hidden rounded-lg">
                {/* Gradient background */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-amber-400 via-rose-500 to-purple-900"
                    aria-hidden="true"
                />

                {/* Content container */}
                <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Awesome Playlists</h1>
                    <p className="text-xl text-white/90 mb-6">Listen to the best playlists curated by us and our users.</p>
                    <div>
                        <Link
                            to="/tracks"
                            className="inline-block px-6 py-3 bg-white/90 hover:bg-white text-black font-medium rounded-md transition-colors"
                        >
                            Listen now
                        </Link>
                    </div>
                </div>
            </div>
            <div className='z-0'>
                <Category/>
            </div>
        </div>

    );
};

export default Home;
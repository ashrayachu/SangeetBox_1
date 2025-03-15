import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingPlaylists } from "../redux/slices/spotifySlice";
import CircularProgress from '@mui/material/CircularProgress';
import PlaylistSlider from '../components/PlaylistSlider';

const Trending = () => {
    const dispatch = useDispatch();
    const { trendingPlaylists, status } = useSelector((state) => state.spotify);

    useEffect(() => {
        dispatch(fetchTrendingPlaylists());
    }, [dispatch]);

    return (
        <div className='min-h-full p-5 text-white bg-neutral-900'>
            {status === "loading" ? (
                <div className="flex justify-center items-center">
                    <CircularProgress className='w-10 h-10' />
                </div>
            ) : (
                <PlaylistSlider title="Trending Playlists" playlists={trendingPlaylists} />
            )}
        </div>
    );
};

export default Trending;

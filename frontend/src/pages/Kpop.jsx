import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchKpopPlaylists } from "../redux/slices/spotifySlice";
import CircularProgress from '@mui/material/CircularProgress';
import PlaylistSlider from '../components/PlaylistSlider';

const Kpop = () => {
    const dispatch = useDispatch();
    const { trendingPlaylists, status } = useSelector((state) => state.spotify);

    useEffect(() => {
        dispatch(fetchKpopPlaylists());
    }, [dispatch]);

    return (
        <div className='min-h-full p-5 text-white bg-neutral-900'>
            {status === "loading" ? (
                <div className="flex justify-center items-center">
                    <CircularProgress className='w-10 h-10' />
                </div>
            ) : trendingPlaylists?.length > 0 ? (
                <PlaylistSlider title="K-Pop Playlists" playlists={trendingPlaylists} />
            ) : null}
        </div>

    );
};

export default Kpop;

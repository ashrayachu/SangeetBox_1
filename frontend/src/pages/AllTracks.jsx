import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { allTracks } from "../redux/slices/allTracks";
import { playSong, setCurrentIndex } from "../redux/slices/playSong";
import CircularProgress from "@mui/material/CircularProgress";

const AllTracks = () => {
    const dispatch = useDispatch();

    // Fixing state selection
    const alltracks = useSelector((state) => state.allTracks?.tracks || []);
    const status = useSelector((state) => state.playSong.status);
    const trackStatus = useSelector((state) => state.allTracks?.status);

    useEffect(() => {
        dispatch(allTracks());
    }, [dispatch]);

    const handlePlay = (songId, songUrl, index) => {
        if (status !== 'loading') {
            dispatch(setCurrentIndex(index));
            dispatch(playSong({ songId, songUrl })).catch((error) => {
                alert("Error playing the song:");
                console.error("Error playing the song:", error);
            });

        }
    };

    console.log("allTracks:", alltracks);

    return (
        <div className="w-full gap-10 min-h-screen bg-black">
            <div className="w-full bg-cyan-950 flex flex-wrap items-center p-4 sm:p-6 md:p-10 gap-6 md:gap-10">
                {/* Playlist Image */}
                <div className="flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"
                        className="w-40 sm:w-48 md:w-60 h-40 sm:h-48 md:h-60 object-cover rounded-md bg-white shadow-2xl"
                        alt="Playlist"
                    />
                </div>

                {/* Playlist Information */}
                <div className="flex flex-col justify-between flex-1 gap-4 md:gap-6">
                    {/* Title & Description */}
                    <div className="flex flex-col gap-2">
                        <p className="hidden sm:block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-100 font-bold">
                           Playlist
                        </p>
                        <p className="text-lg sm:text-2xl md:text-3xl text-amber-100 font-normal">
                            Awesome Playlist
                        </p>
                        <p className="text-md sm:text-xl md:text-2xl text-amber-100 font-normal">
                            Collection of all the tracks in admin dashbord
                        </p>
                    </div>

                    {/* Song Count & Play Button */}
                    <div className="flex items-center gap-3">
                        <p className="text-gray-400 text-sm sm:text-base">
                            {alltracks.length ?? "0"} songs
                        </p>
                        <button className="text-amber-100 text-sm sm:text-base font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-all">
                            Play
                        </button>
                    </div>
                </div>
            </div>


            <div className="text-white p-2 md:p-10">
                {trackStatus === "loading" ? (
                    <CircularProgress className="text-white" />
                ) : alltracks.length > 0 ? (
                    <ul>
                        {alltracks.map((result, index) => (
                            <li key={index} onClick={()=>handlePlay(result.songId, result.songDetails?.external_urls?.spotify, index)} >
                                <div className={`flex items-center gap-2 w-full hover:bg-neutral-800 cursor-pointer p-2 rounded-lg`}>
                                    <div>
                                        <img src={result.songDetails?.album?.images?.[0]?.url} alt="album cover" className="w-12 h-12" />
                                    </div>
                                    <div>{result?.name}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-400 text-center mt-4">Could not find songs from playlist</div>
                )}
            </div>
        </div>
    );
};

export default AllTracks;

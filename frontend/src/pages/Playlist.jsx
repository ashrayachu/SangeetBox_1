import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPlaylist } from "../redux/slices/getPlaylist";
import { playSong, setCurrentIndex } from "../redux/slices/playSong";


import CircularProgress from "@mui/material/CircularProgress";

const Playlist = () => {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const [foundplaylist, setFoundPlaylist] = useState(null);

    const playlist = useSelector((state) => state.playSong?.playlist);
    const { playlistStatus } = useSelector((state) => state.playlist);
    const searchResults = useSelector((state) => state.search.searchResults);
    const trendingPlaylists = useSelector((state) => state.spotify.trendingPlaylists);
    const status = useSelector((state) => state.playSong?.status);
    const user= useSelector((state)=>state.auth?.userDoc)

    useEffect(() => {
        if (playlistId && user) {
            let foundPlaylist = null;
            dispatch(getPlaylist(playlistId));

            if (trendingPlaylists.length > 0) {
                foundPlaylist = trendingPlaylists.find((p) => p?.id === playlistId);
            }
            if (searchResults.playlists?.items?.length > 0) {
                foundPlaylist = searchResults.playlists.items.find((p) => p?.id === playlistId);
            }

            if (foundPlaylist) {
                setFoundPlaylist(foundPlaylist);
            }
        }
    }, [playlistId, dispatch, trendingPlaylists, searchResults]);

    const image = foundplaylist?.images?.[0]?.url;
    const title = foundplaylist?.name || "Unknown Playlist";
    const description = foundplaylist?.description || "No description available";

    const handlePlay = (songId, songUrl, index) => {
        if (status !== "loading") {
            dispatch(setCurrentIndex(index));
            dispatch(playSong({ songId, songUrl })).catch((error) => {
                alert("Error playing the song");
                console.error("Error playing the song:", error);
            });
        }
    };

    return (
        <div className="w-full gap-10 min-h-screen bg-black">
            <div className="w-full bg-cyan-950 flex flex-wrap items-center p-4 sm:p-6 md:p-10 gap-6 md:gap-10">
                <div className="flex-shrink-0">
                    <img
                        src={image || "https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D"}
                        className="w-40 sm:w-48 md:w-60 h-40 sm:h-48 md:h-60 object-cover rounded-md bg-white shadow-2xl"
                        alt="Playlist"
                    />
                </div>

                <div className="flex flex-col justify-between flex-1 gap-4 md:gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="hidden sm:block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-100 font-bold">
                            {title}
                        </p>
                        <p className="text-lg sm:text-2xl md:text-3xl text-amber-100 font-normal">
                            {description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-gray-400 text-sm sm:text-base">
                            {playlist?.length} songs
                        </p>
                        <button 
                        onClick={() => handlePlay(playlist[0].track.id, playlist[0].track.external_urls.spotify, 0)}
                         className="text-amber-100 text-sm sm:text-base font-medium bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-all">
                            Play
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-white p-2 md:p-10">
                {playlistStatus === "loading" ? (
                    <CircularProgress className="text-white" />
                ) : playlist?.length > 0 ? (
                    <ul>
                        {playlist.map((result, index) => (
                            <li
                                key={index}
                                onClick={() => handlePlay(result.track.id, result.track.external_urls.spotify, index)}
                            >
                                <div className={`flex items-center gap-2 w-full hover:bg-neutral-800 cursor-pointer p-2 rounded-lg`}>
                                    <div>
                                        <img src={result.track.album?.images?.[0]?.url} alt="album cover" className="w-12 h-12" />
                                    </div>
                                    <div>{result.track.name}</div>
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

export default Playlist;

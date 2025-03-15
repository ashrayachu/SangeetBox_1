import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSong";  // Adjust the path as needed
import playReducer from "./slices/playSong";
import playlistReducer from "./slices/getPlaylist";
import spotifyReducer from "./slices/spotifySlice";
import userAuthReducer from "./slices/userAuth";
import allTacksReducer from "./slices/allTracks";





const store = configureStore({
  reducer: {
    search: searchReducer,
    playSong: playReducer,
    playlist: playlistReducer,
    spotify: spotifyReducer,
    auth: userAuthReducer,
    allTracks:allTacksReducer

  },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { getPlaylist } from "./getPlaylist";
import { allTracks } from "./allTracks";
const API_URL = import.meta.env.VITE_API_URL;

//Async function to play a song (API call)
export const playSong = createAsyncThunk(
  "player/playSong",
  async ({ songId, songUrl }, { rejectWithValue }) => {

    try {
      console.log("Sending request:", { songId, songUrl });
      // const response = await axios.post(`${API_URL}/api/play`, {
      //   songId,
      //   songUrl,
      // });

       const response = await axios.post(`http://localhost:5000/api/play`, {
        songId,
        songUrl,
      });
      return response.data;
    } catch (error) {

      toast.error("Error playing song. Try again later.");
      return rejectWithValue(error.response?.data?.message || "Playback failed");
    }
  }
);

const playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    status: "idle", // 'loading', 'succeeded', 'failed', 'playing', 'paused'
    playlist: [],
    error: null,
    currentIndex: 0,
    maximize: false
  },

  reducers: {
    // ⏯ Toggle play/pause state
    playPause: (state) => {
      if (state.status === "playing") {
        state.status = "paused";
      } else if (state.currentSong) {
        state.status = "playing";
      }
    },
    toggleMaximize: (state) => {
      state.maximize = !state.maximize; // ✅ Toggle maximize state
    },

    // ⏹ Stop the song
    stopSong: (state) => {
      state.status = "stopped";
      state.currentSong = null;
    },
    nextSong: (state) => {
      const playlistLength = state.playlist.length; 
    
      if (state.currentIndex < playlistLength - 1) {
        state.currentIndex += 1; // Increment index
        state.currentSong = state.playlist[state.currentIndex]; // Set the next song
        state.status = "playing"; // Update status properly
      } else {
        state.status = "stopped"; // Stop if last song
      }
    },
    prevSong: (state, action) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.status = "playing";
      }
    },


    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
    setCurrentIndex: (state, action) => {
      const newIndex = action.payload;
      if(newIndex > 0){
        state.currentIndex = newIndex;
      }

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(playSong.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(playSong.fulfilled, (state, action) => {
        state.status = "playing"; // Auto-play on success
        state.currentSong = action.payload;

      })
      .addCase(playSong.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Playback failed";
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.playlist = action.payload.data.items;
        state.currentIndex = 0;
      })
      .addCase(allTracks.fulfilled, (state, action) => {
        state.playlist = action.payload;
        state.currentIndex = 0;
      });
  }
});

export const { playPause, stopSong, prevSong, nextSong, toggleMaximize, setPlaylist, setCurrentIndex, clearError } = playerSlice.actions;
export default playerSlice.reducer;

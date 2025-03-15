import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

// Async function to search songs
export const allTracks = createAsyncThunk("getAllTracks", async (_, { rejectWithValue }) => {


    try {
        // const response = await axios.get("http://localhost:5000/api/tracks"); 
        const response = await axios.get(`${API_URL}/api/tracks`);

        return response.data;
    } catch (error) {
        toast.error("Couldn't retrieve the songs from database. Try again later.");
        return rejectWithValue(error.response?.data?.message || "Search failed");
    }
});

const trackSlice = createSlice({
    name: "tracks",  // ✅ Changed to "search" to match its purpose
    initialState: {
        tracks: [],  // ✅ Removed unnecessary `songs` state
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allTracks.pending, (state) => {
                state.status = "loading";
                state.error = null;  // ✅ Reset error on new search
            })
            .addCase(allTracks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tracks = action.payload;
            })
            .addCase(allTracks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Search failed";  // ✅ Ensuring error handling is correct
            });

    },
});

export default trackSlice.reducer;

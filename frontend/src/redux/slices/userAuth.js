import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

// Async function to search songs
export const googleAuth = createAsyncThunk("auth/googleAuth", async (_, { rejectWithValue }) => {

  try {
    // const response = await axios.get(`http://localhost:5000/auth`, { withCredentials: true });
    const response = await axios.get(`${API_URL}/auth`, { withCredentials: true });

    return response.data;
  } catch (error) { 
    toast.info("Could not find user");
    return rejectWithValue(error.response?.data?.message || "Could not find google user");
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {

  try {
    // const response = await axios.get(`http://localhost:5000/logout`, { withCredentials: true });
    const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });

    return response.data;
  } catch (error) {
    toast.error("Could not logout. Try again later.");
    return rejectWithValue(error.response?.data?.message || "logout unsuccessfull");
  }
});


export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("FormData being sent:", formData); // Debugging log

      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        withCredentials: true, // Ensure cookies are sent if required
      });
      // const response = await axios.post(`http://localhost:5173/register`, formData, {
      //   withCredentials: true, // Ensure cookies are sent if required
      // });

      // Show success message
      toast.success("Registration successful!");

      // Redirect after successful registration
      window.location.href = "http://localhost:5173/";
      // window.location.href = API_URL;


      return response.data;
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("User already exists. Try logging in.");
      } else {
        toast.error(error.response?.data?.message || "Registration failed");
      }
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("FormData being sent:", formData); // Debugging log

      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true, // Ensure cookies are sent if required
      });
      // const response = await axios.post(`http://localhost:5000/login`, formData, {
      //   withCredentials: true, // Ensure cookies are sent if required
      // });

      // Show success message
      toast.success("login successful!");

      // Redirect after successful registration
      window.location.href = "http://localhost:5173/";
      // window.location.href = API_URL;


      return response.data;
    } catch (error) {
      
        toast.error(error.response?.data?.message || "login failed");
      return rejectWithValue(error.response?.data?.message || "login failed");
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    userDoc: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;  // ✅ Reset error on new search
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDoc = action.payload;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "google auth failed";  // ✅ Ensuring error handling is correct
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;  // ✅ Reset error on new search
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDoc = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "logout failed";  // ✅ Ensuring error handling is correct
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;  // ✅ Reset error on new search
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDoc = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "registration failed";  // ✅ Ensuring error handling is correct
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;  // ✅ Reset error on new search
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDoc = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "login failed";  // ✅ Ensuring error handling is correct
      })

  },
});

export default auth.reducer;

import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Karaoke from "./components/Karaoke";
import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Playlist from "./pages/Playlist";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AllTracks from "./pages/AllTracks";
import Trending from "./pages/Trending";
import Tamil from "./pages/Tamil";






function App() {
  // const [maximize, setMaximize] = useState(false); // Moved state to App
  return (
    <Router>
  <ToastContainer />
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/karaoke/:songId" element={<Karaoke />} />
      <Route path="/playlist/:playlistId" element={<Playlist />} />
      <Route path="/tracks" element={<AllTracks />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/tamil" element={<Tamil />} />
    </Route>
  </Routes>
</Router>

  );
}

export default App;

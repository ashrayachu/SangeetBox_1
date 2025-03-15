import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import React from "react";

const MainLayout = () => (
  <div className="h-screen flex flex-col">
    <Navbar/>
    <div className="flex flex-grow h-screen ">
      <Sidebar />
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
    <Footer />
    <div className="relative z-50">
      <MusicPlayer />
    </div>
  </div>
);

export default MainLayout;

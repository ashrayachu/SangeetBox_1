const express = require("express");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const connectDB = require("./config/db");


const spotifyRoutes = require("./routes/spotifyRoutes");
const songRoutes = require("./routes/songRoutes");
const PlaylistRoutes = require("./routes/PlaylistRoutes");
const alltracksRoutes = require("./routes/alltracksRoutes");
const addPlaylistRoutes = require("./routes/addPlaylistRoutes");
const userAuthRoutes = require("./routes/userAuthRoutes");



require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // Update with your frontend URL
    credentials: true
}));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' },
    sameSite: 'None'
}));
app.use((req, res, next) => {
    console.log("Cookies Received:", req.cookies);
    console.log("Session Data:", req.session);
    next();
});


app.use(passport.initialize());
app.use(passport.session());







connectDB();

app.use("/api", spotifyRoutes);
app.use("/api", songRoutes);
app.use("/api", PlaylistRoutes);
app.use("/api", alltracksRoutes);
app.use("/api", addPlaylistRoutes);
app.use("/auth", userAuthRoutes);






const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

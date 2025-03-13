const axios = require("axios");
require("dotenv").config();
const getSpotifyToken = require("../utlis/spotifyAuth");


const fetchSongDetails = async (songId) => {
    if (!songId) {
        return res.status(400).json({ message: "Missing songId in request query" });
    }

    try {
        const spotifyToken = await getSpotifyToken();
   
        if (!spotifyToken) {
            return res.status(500).json({ error: "Failed to retrieve Spotify token" });
        }

        const response = await axios.get(
            `https://api.spotify.com/v1/tracks/${songId}`,
            { headers: { Authorization: `Bearer ${spotifyToken}` } }
        );

        return response.data
    } catch (error) {
        console.error("Error searching track:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to fetch song from Spotify" });
    }
};

module.exports = { fetchSongDetails };

const axios = require("axios");
const getSpotifyToken = require("../utlis/spotifyAuth");
require("dotenv").config();


const searchTracks = async (req, res) => {
  const { query } = req.query;
  console.log("query", query);
  const spotifyToken = await getSpotifyToken();
  if (!spotifyToken) {
    console.log("Spotify token is missing, crashing app...");
    process.exit(1); // Force a crash if no token is available
  }
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track,playlist&limit=10`,
      { headers: { Authorization: `Bearer ${spotifyToken}` } }
    );

    res.json(response.data);
  } catch (error) {
    console.log("Error searching tracks:", error);
    res.status(500).json({ error: "Failed to fetch songs from Spotify" });
    process.exit(1)
  }
};

module.exports = { searchTracks };

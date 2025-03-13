const axios = require("axios");
require("dotenv").config();

let spotifyToken = "";
let tokenExpiry = 0;

const getSpotifyToken = async () => {
  if (spotifyToken && Date.now() < tokenExpiry) {
    return spotifyToken; // ✅ Use cached token if still valid
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    spotifyToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000; // ✅ Store expiration time
    return spotifyToken;
  } catch (error) {
    console.error("Error getting Spotify token:", error.message);
    throw new Error("Failed to fetch Spotify token");
  }
};

module.exports = getSpotifyToken;

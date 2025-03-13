// const Song = require("../models/Song");
// const cloudinary = require("../config/cloudinaryConfig");
// const fetchSong = require("../utlis/fetchSong");
// const { fetchSongDetails } = require("../utlis/fetchSongDetails");

const addToPlaylist = async (req, res) => {
//   try {
//     const { songId, songUrl } = req.body;
//     console.log("songUrl", songUrl)
    
//     const existingSong = await Song.findOne({ songId });
//     if (existingSong) {
//       console.log("Song already exists in database");
//       return res.json({
//         songId,
//         url: existingSong.cloudinaryUrl,
//         songDetails: existingSong.songDetails,
//         cloudinary: true
//       });
//     }

//     console.log("Song ID:", songId);

//     // Fetch song details
//     const songDetails = await fetchSongDetails(songId).catch((error) => {
//       console.log("Error fetching song details:", error);
//       return null;
//     });

//     if (!songDetails) return res.status(500).json({ error: "Failed to fetch song details" });

//     // Fetch song URL
//     const { audioUrl, songName } = await fetchSong(songUrl).catch((error) => {
//       console.log("Error fetching song audio:", error);
//       return null;
//     });

//     if (!audioUrl) return res.status(500).json({ error: "Failed to fetch song audio" });

//     // Upload to Cloudinary
//     const uploadResult = await cloudinary.uploader.upload(audioUrl, {
//       resource_type: "auto",
//       folder: "songs",
//       public_id: songId,
//     });


//     // Save to database
//     const newSong = new Song({
//       songId,
//       name: songName,
//       cloudinaryUrl: uploadResult.secure_url,
//       songDetails: songDetails
//     });

//     await newSong.save();

//     return res.json({
//       songId,
//       name: songName,
//       url: uploadResult.secure_url,
//       songDetails: songDetails,
//       cloudinary: false
//     });

//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
res.json("Hello from addtoplaylist route")
};

module.exports = { addToPlaylist };

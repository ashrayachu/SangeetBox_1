const Song = require("../models/Song");
const cloudinary = require("../config/cloudinaryConfig");
const fetchSong = require("../utlis/fetchSong");
const { fetchSongDetails } = require("../utlis/fetchSongDetails");
const axios = require("axios");

const playSong = async (req, res) => {
  try {
    const { songId, songUrl } = req.body;
    
    const existingSong = await Song.findOne({ songId });
    if (existingSong) {
      console.log("Song already exists in database");
      return res.json({
        songId,
        url: existingSong.cloudinaryUrl,
        songDetails: existingSong.songDetails,
        cloudinary: true
      });
    }

    // Fetch song details
    const songDetails = await fetchSongDetails(songId).catch((error) => {
      console.log("Error fetching song details:", error);
      return null;
    });

    if (!songDetails) return res.status(500).json({ error: "Failed to fetch song details" });

    // Fetch song URL
    const { audioUrl, songName } = await fetchSong(songUrl).catch((error) => {
      console.log("Error fetching song audio:", error);
      return null;
    });

    if (!audioUrl) return res.status(500).json({ error: "Failed to fetch song audio" });

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(audioUrl, {
      resource_type: "auto",
      folder: "songs",
      public_id: songId,
    })


    // Save to database
    const newSong = new Song({
      songId,
      name: songName,
      cloudinaryUrl: uploadResult.secure_url,
      songDetails: songDetails
    });

    await newSong.save();

    return res.json({
      songId,
      name: songName,
      url: uploadResult.secure_url,
      songDetails: songDetails,
      cloudinary: false
    });

  } catch (error) {
    console.log("Internal Server Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



// const playSong = async (req, res) => {
//   try {
//     const { songId, songUrl } = req.body;

//     // Check if song already exists in DB
//     const existingSong = await Song.findOne({ songId });
//     if (existingSong) {
//       console.log("✅ Song already exists in database");
//       return res.json({
//         songId,
//         url: existingSong.cloudinaryUrl,
//         songDetails: existingSong.songDetails,
//         cloudinary: true
//       });
//     }

//     // Fetch song details
//     const songDetails = await fetchSongDetails(songId);
//     if (!songDetails) {
//       console.error("❌ Error: Failed to fetch song details");
//       return res.status(500).json({ error: "Failed to fetch song details" });
//     }

//     // Fetch audio file URL
//     const { audioUrl, songName } = await fetchSong(songUrl);
//     if (!audioUrl) {
//       console.error("❌ Error: Failed to fetch song audio");
//       return res.status(500).json({ error: "Failed to fetch song audio" });
//     }

//     console.log("🎵 Fetching audio file:", audioUrl);

//     // Stream the file from the URL and upload to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       axios({
//         method: "get",
//         url: audioUrl,
//         responseType: "stream",
//       })
//         .then((response) => {
//           const uploadStream = cloudinary.uploader.upload_stream(
//             { resource_type: "video", folder: "songs", public_id: songId },
//             (error, result) => {
//               if (error) {
//                 console.error("❌ Error uploading to Cloudinary:", error);
//                 reject(error);
//               } else {
//                 console.log("✅ Upload success:", result.secure_url);
//                 resolve(result);
//               }
//             }
//           );
//           response.data.pipe(uploadStream);
//         })
//         .catch((error) => {
//           console.error("❌ Error fetching the audio file:", error);
//           reject(error);
//         });
//     });

//     if (!uploadResult || !uploadResult.secure_url) {
//       return res.status(500).json({ error: "Failed to upload song to Cloudinary" });
//     }

//     // Save to database
//     const newSong = new Song({
//       songId,
//       name: songName,
//       cloudinaryUrl: uploadResult.secure_url,
//       songDetails: songDetails,
//     });

//     await newSong.save();

//     return res.json({
//       songId,
//       name: songName,
//       url: uploadResult.secure_url,
//       songDetails: songDetails,
//       cloudinary: false,
//     });

//   } catch (error) {
//     console.error("❌ Internal Server Error:", error);
//     return res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

module.exports = { playSong };

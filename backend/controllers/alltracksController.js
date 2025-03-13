const axios = require("axios");
const Song = require("../models/Song");

const alltracks = async (req, res) => {
  try {
    // Step 1: Retrieve all songIds from the database
    const songs = await Song.find({})  
    res.json(songs)
  }
  catch(e){
    console.log(e)
    res.status(500).json("internal server error, couldn't retrieve songs from mongoDB ")
  }
};

module.exports = { alltracks };

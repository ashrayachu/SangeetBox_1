const express = require("express");
const { addToPlaylist } = require("../controllers/addToPlaylistController");

const router = express.Router();

router.post("/liked", addToPlaylist);

module.exports = router;

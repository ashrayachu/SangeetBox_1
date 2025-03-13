const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true }, // ✅ Allow multiple null values
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      validate: {
        validator: function (value) {
          return this.googleId ? true : value.length > 0; // ✅ Require password if not using Google login
        },
        message: "Password is required if not using Google login.",
      },
    },
    image: { type: String },
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        default: [], // ✅ Default empty array
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

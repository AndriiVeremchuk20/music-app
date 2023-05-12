import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  posterPath: {
    type: String,
    default: null,
  },
  musicPath: {
    type: String,
    require: true,
    unique: true,
  },
  postedAt: {
    type: mongoose.SchemaTypes.Date,
    require: true,
    default: Date.now(),
  },
  userId: {
    type: String,
    ref: "User",
    require: true,
  },
});

const Music = mongoose.model("Music", musicSchema);

export default Music;

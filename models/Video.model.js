const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  videoYtId: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  channelYtId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelThumbnail: {
    type: String,
    required: true,
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;

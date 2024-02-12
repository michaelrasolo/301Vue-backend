
const Video = require("../models/Video.model.js");

async function createVideo(reqBody) {
  try {
    // Create & save object
    const newVideo = new Video({
      title: reqBody.title,
      videoYtId: reqBody.videoYtId,
      thumbnail: reqBody.thumbnail,
      description: reqBody.description,
      publishedAt: reqBody.publishedAt,
      channelYtId: reqBody.channelYtId,
      channelName: reqBody.channelName,
      player: reqBody.player,
    });

    const savedVideo = await newVideo.save();

    return savedVideo;
  } catch (error) {
    throw error;
  }
}

module.exports = { createVideo };

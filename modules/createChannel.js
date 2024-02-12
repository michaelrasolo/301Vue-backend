
const Channel = require("../models/Channel.model.js");

async function createChannel(reqBody) {
  try {
    // Create & save channel
    const newChannel = new Channel({
        channelYtId: reqBody.channelYtId,
        channelTitle: reqBody.channelTitle,
        thumbnail: reqBody.thumbnail,
        description: reqBody.description,
      customUrl: reqBody.customUrl
    });

    const savedChannel = await newChannel.save();

    return savedChannel;
  } catch (error) {
    throw error;
  }
}

module.exports = { createChannel };

const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const Channel = require('../models/Channel.model.js');
const {createChannel} = require('../modules/createChannel.js')
const {checkBody} = require('../modules/checkBody.js')

router.get('/', isAuthenticated, (req, res, next) => {
  res.json('Channel Route if isAuthenticated');
});

// ============ POST channel/ || Create a channel ============ //
router.post("/", isAuthenticated, async (req, res, next) => {
  if (
    !checkBody(req.body, [
      "channelYtId",
      "channelTitle",
      "description",
      "customUrl",
      "thumbnail"
    ])
  )
    return res
      .status(400)
      .json({ message: "🚧 Provide all mandatory information" });
  try {
    // Create & save object
    const savedChannel = await createChannel(req.body);

    // Respond with the saved channel object
    res.status(201).json(savedChannel);
  } catch (error) {
    next(error);
  }
});

// ============ GET channel/:channelId || Retrieve a channel data ============ //
router.get("/:channelId", isAuthenticated, async (req, res, next) => {
  try {
    // Check the db
    const channel = await Channel.findById(req.params.videoId);

    // If the channel is not found
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Return the channel data
    res.json(channel);
  } catch (error) {
    next(error);
  }
});


module.exports = router;

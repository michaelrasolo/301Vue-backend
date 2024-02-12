const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Video = require("../models/Video.model.js");
const { checkBody } = require("../middleware/checkBody");

/*
_id ObjectId [primary key]
  title String
  videoYtId String
  thumbnail String
  description String
  publishedAt Date
  channelId String
  channelName String
  player String
*/

router.get("/:videoId", isAuthenticated, async (req, res, next) => {
  try {
    // Check the db
    const video = await Video.findById(req.params.videoId);

    // If the video is not found
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    // Return the video data
    res.json(video);
  } catch (error) {
    next(error);
  }
});

// Route to create a new video
router.post("/", isAuthenticated, async (req, res, next) => {
  if (
    !checkBody(req.body, [
      "title",
      "videoYtId",
      "thumbnail",
      "description",
      "publishedAt",
      "channelYtId",
      "channelName",
    ])
  )
    return res
      .status(400)
      .json({ message: "🚧 Provide all mandatory information" });
  try {
    // Create & save object
    const newVideo = new Video({
      title: req.body.title,
      videoYtId: req.body.videoYtId,
      thumbnail: req.body.thumbnail,
      description: req.body.description,
      publishedAt: req.body.publishedAt,
      channelYtId: req.body.channelYtId,
      channelName: req.body.channelName,
      player: req.body.player,
    });

    const savedVideo = await newVideo.save();

    // Respond with the saved video object
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

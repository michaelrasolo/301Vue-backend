const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Video = require("../models/Video.model.js");
const Fav = require("../models/Fav.model.js");
const { checkBody } = require("../modules/checkBody.js");
const { createVideo } = require("../modules/createVideo.js");

// ============ GET video/:videoId || Retrieve a video data ============ //
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

// ============ POST video/ || Create a video ============ //
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
    const savedVideo = await createVideo(req.body);

    // Respond with the saved video object
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

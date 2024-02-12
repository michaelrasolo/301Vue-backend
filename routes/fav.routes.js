const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Video = require("../models/Video.model.js");
const Fav = require("../models/Fav.model.js");
const { checkBody } = require("../modules/checkBody.js");
const { createVideo } = require("../modules/createVideo.js");

// ============ POST /fav || Add video to favs ============ //
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    if (!checkBody(req.body, ["videoYtId"]))
      return res.status(400).json({ message: "🚧 Provide the videoYtId" });

    // Check if the video exists in the database
    let existingVideo = await Video.findOne({ videoYtId: req.body.videoYtId });

    // If not, create video
    if (!existingVideo) {
      existingVideo = await createVideo(req.body);
    }

    // Fav object created & saved
    const newFav = new Fav({
      videoId: existingVideo._id,
      videoYtId: existingVideo.videoYtId,
      userId: req.user._id,
    });

    const savedFav = await newFav.save();

    // Respond with the saved fav object
    res.status(201).json(savedFav);
  } catch (error) {
    next(error);
  }
});

// ============ GET /fav || Retrive all favs ============ //
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const favVideos = await Fav.find({ userId: req.user._id }).populate('videoId');

    if (!favVideos) {
      return res
        .status(400)
        .json({ message: "🚧 No favs found for this user ID" });
    }

    res.status(201).json(favVideos);
  } catch (error) {
    next(error);
  }
});


// ============ DELETE /fav || Remove video from favs ============ //
router.delete("/:videoYtId", isAuthenticated, async (req, res, next) => {
  try {
    const deleteFav = await Fav.findOneAndDelete({ userId: req.user._id, videoYtId:req.params.videoYtId });

    if (!deleteFav) {
      return res.status(400).json({ message: "🚧 Fav not found" });
    }

    res.status(204).json({ message: `🗑️ Favorite deleted successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

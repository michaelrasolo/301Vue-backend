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
  channelThumbnail String
*/

router.get("/", isAuthenticated, (req, res, next) => {
  res.json("Video Route if isAuthenticated");
});

module.exports = router;

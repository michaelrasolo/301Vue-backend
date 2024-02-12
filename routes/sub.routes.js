const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Channel = require("../models/Channel.model.js");
const Sub = require("../models/Sub.model.js");
const { checkBody } = require("../modules/checkBody.js");
const { createChannel } = require("../modules/createChannel.js");

// ============ POST /sub || Add channel to subs ============ //
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    if (!checkBody(req.body, ["channelYtId"]))
      return res.status(400).json({ message: "🚧 Provide the channelYtId" });

    // Check if the channel exists in the database
    let existingChannel = await Channel.findOne({ channelYtId: req.body.channelYtId });

    // If not, create channel
    if (!existingChannel) {
      existingChannel = await createChannel(req.body);
    }

    // Sub object created & saved
    const newSub = new Sub({
      channelId: existingChannel._id,
      channelYtId: existingChannel.channelYtId,
      userId: req.user._id,
    });

    const savedSub = await newSub.save();

    // Respond with the saved sub object
    res.status(201).json(savedSub);
  } catch (error) {
    next(error);
  }
});

// ============ GET /sub || Retrive all subs ============ //
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const subChannels = await Sub.find({ userId: req.user._id }).populate('channelId');

    if (!subChannels) {
      return res
        .status(400)
        .json({ message: "🚧 No subs found for this user ID" });
    }

    res.status(201).json(subChannels);
  } catch (error) {
    next(error);
  }
});


// ============ DELETE /sub || Remove channel from subs ============ //
router.delete("/:channelYtId", isAuthenticated, async (req, res, next) => {
  try {
    const deleteSub = await Sub.findOneAndDelete({ userId: req.user._id, channelYtId:req.params.channelYtId });

    if (!deleteSub) {
      return res.status(400).json({ message: "🚧 Sub not found" });
    }

    res.status(204).json({ message: `🗑️ Sub deleted successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

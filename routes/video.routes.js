const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const Video = require('../models/Video.model.js');

router.get('/', isAuthenticated, (req, res, next) => {
  res.json('Video Route if isAuthenticated');
});



module.exports = router;

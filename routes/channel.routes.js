const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware.js');
const Channel = require('../models/Channel.model.js');

router.get('/', isAuthenticated, (req, res, next) => {
  res.json('Channel Route if isAuthenticated');
});



module.exports = router;

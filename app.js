require('dotenv').config();
require('./db'); // Connection to MongoDB


const express = require('express');
const app = express();
require('./config')(app); // Runs middlewares
const videoRoutes = require('./routes/video.routes');
const channelRoutes = require('./routes/channel.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/auth', authRoutes);
app.use('/channel', channelRoutes);
app.use('/video', videoRoutes);

require('./error-handling')(app);

module.exports = app;
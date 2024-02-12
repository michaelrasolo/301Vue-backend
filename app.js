require('dotenv').config();
require('./db'); // Connection to MongoDB


const express = require('express');
const app = express();
require('./config')(app); // Runs middlewares
const videoRoutes = require('./routes/video.routes');
const channelRoutes = require('./routes/channel.routes');
const authRoutes = require('./routes/auth.routes');
const favRoutes = require('./routes/fav.routes');
const subRoutes = require('./routes/sub.routes');

app.use('/auth', authRoutes);
app.use('/channel', channelRoutes);
app.use('/video', videoRoutes);
app.use('/sub', subRoutes);
app.use('/fav', favRoutes);

require('./error-handling')(app);

module.exports = app;
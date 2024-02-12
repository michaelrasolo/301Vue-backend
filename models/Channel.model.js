const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
  channelYtId: {
    type: String,
    required: true,
    unique: true
  },
  channelTitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
},
customUrl: {
    type: String,
    required: true
  },
thumbnail: {
    type: String,
    required: true
  }
});

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;

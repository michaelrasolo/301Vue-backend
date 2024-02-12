const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subSchema = new Schema({
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Sub = mongoose.model('Sub', subSchema);

module.exports = Sub;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema({
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  videoYtId: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Fav = mongoose.model('Fav', favSchema);

module.exports = Fav;

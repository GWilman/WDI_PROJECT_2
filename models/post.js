const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: String,
  videoURL: { type: String, required: true }
});

module.exports = mongoose.model('Post', postSchema);

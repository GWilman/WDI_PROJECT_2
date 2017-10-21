const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: String,
  videoURL: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

postSchema.methods.belongsTo = function postBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

// FOR MONDAY - CAN I DO A FUNCTION HERE THAT REVERSES THE ORDER OF THE ARRAY?

module.exports = mongoose.model('Post', postSchema);

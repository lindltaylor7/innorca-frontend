const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  requestId: { type: mongoose.Types.ObjectId, ref: "Request" },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  name: String,
  userType: Number,
  content: String,
  fileUrl: String,
  fileName:String
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

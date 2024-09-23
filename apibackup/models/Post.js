const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  image: String,
  content: String,
  fileName: String,
  fileUrl: String,
  disponible: {type: Boolean, default: false},
  link:String
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
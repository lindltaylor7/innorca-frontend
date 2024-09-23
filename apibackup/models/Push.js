const mongoose = require('mongoose');

const pushSchema = new mongoose.Schema({
  pushId: String,
  user:{ type: mongoose.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Push = mongoose.model('pushes', pushSchema);

module.exports = Push;

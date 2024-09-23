const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  user:{ type: mongoose.Types.ObjectId, ref: "User" },
  read: false
}, { timestamps: true });

const Notification = mongoose.model('notifications', notificationSchema);

module.exports = Notification;

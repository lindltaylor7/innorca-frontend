const mongoose = require("mongoose");

const executiveSchema = new mongoose.Schema(
  {
    userId: Number,
    projectId: Number,
    email: Number,
    fname: Number,
    lname: Number,
    username: String,
    phone: String,
  },
  { timestamps: true }
);

const Executive = mongoose.model("Executive", executiveSchema);

module.exports = Executive;

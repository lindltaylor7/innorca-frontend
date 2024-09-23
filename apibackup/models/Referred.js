const mongoose = require('mongoose');

const referredSchema = new mongoose.Schema({
  referencerId: { type: mongoose.Types.ObjectId, ref: 'User' },
  name: String,
  dni: String,
  documentType: String,
  document: String,
  email: String,
  phone: String,
  projectId: String,
  projectList: [{ type: String }],
  comments: String,
  propertyType: String,
  status: Number,
  sperantId: String,
  statusList: [{ type: mongoose.Types.ObjectId, ref: 'ReferredStatus' }],
  sperantStatus: String,
  sperantRawData: Object,
}, { timestamps: true });

const Referred = mongoose.model('Referred', referredSchema);

module.exports = Referred;

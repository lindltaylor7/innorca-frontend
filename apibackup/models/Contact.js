const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactId: { type: mongoose.Types.ObjectId, ref: 'User' },
  firstName: String,
  lastName: String,
  name: String,
  dni: String,
  documentType: String,
  document: String,
  email: String,
  phone: String,
  projectId: String,
  comments: String,
  propertyType: String,
  networkId: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

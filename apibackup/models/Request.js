const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  userName: String,
  email: String,
  phone: String,
  nameProject: String,
  projectId: String,
  detail: String,
  fileUrl: String,
  fileName: String,
  subject: String,
  contract_num: String,
  // 0 sin responder, 1 respondido, 2 cerrado
  status: { type: Number, default: 0 },
  sperantStatus: { type: String, default: 'Registrado' },
  sperantObservation: { type: String },
  sperantCategory: { id: String, name: String },
  sperantType: { id: String, name: String },
  // 0 Consulta de Atención al Cliente, 1 Consulta de Cobranzas, 2 Otras consultas
  typeConsult:{ type: Number, default: 0 },
  // 0 Lotes, 1 Casas
  typeProduct: { type: Number, default: 0 },
  sperantRawData: { type: Object }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;

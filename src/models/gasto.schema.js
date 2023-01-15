const mongoose = require('mongoose');

const gastoSchema = new mongoose.Schema({
  descripcion: { type: String, required: true },
  tipo: { type: String, required: true },
  monto: { type: Number, required: true },
});

const Gasto = mongoose.model('gasto', gastoSchema);
module.exports = Gasto;

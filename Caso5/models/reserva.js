const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, 'El código es obligatorio'],
    unique: true
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [20, 'La descripción no puede superar 20 caracteres']
  },
  id_auditorio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auditorio',
    required: [true, 'El auditorio es obligatorio']
  },
  id_conferencista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conferencista',
    required: [true, 'El conferencista es obligatorio']
  }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
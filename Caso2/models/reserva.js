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
  id_cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'El cliente es obligatorio']
  },
  id_vehiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehiculo',
    required: [true, 'El vehículo es obligatorio']
  }
}, { timestamps: true });

module.exports = mongoose.model('Reserva', reservaSchema);
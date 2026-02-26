const mongoose = require('mongoose');

const auditorioSchema = new mongoose.Schema({
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    unique: true,
    trim: true,
    maxlength: [20, 'La cédula no puede superar 20 caracteres']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [50, 'El nombre no puede superar 50 caracteres']
  },
  ubicacion: {
    type: String,
    trim: true,
    maxlength: [100, 'La ubicación no puede superar 100 caracteres']
  },
  capacidad: {
    type: Number,
    trim: true,
    min: [1, 'La capacidad debe ser al menos 1'],
    max: [1000, 'La capacidad no puede superar 1000']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [20, 'La descripción no puede superar 20 caracteres']
  }
}, { timestamps: true });

module.exports = mongoose.model('Auditorio', auditorioSchema);
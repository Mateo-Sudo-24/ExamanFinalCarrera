const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [20, 'El nombre no puede superar 20 caracteres']
  },
  codigo: {
    type: String,
    required: [true, 'El código es obligatorio'],
    unique: true,
    trim: true,
    maxlength: [20, 'El código no puede superar 20 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: [20, 'La descripción no puede superar 20 caracteres']
  },
  creditos: {
    type: String,
    maxlength: [10, 'Los créditos no pueden superar 10 caracteres']
  },
  id_usuario: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Usuario',
  required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Materia', materiaSchema);
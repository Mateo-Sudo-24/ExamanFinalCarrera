const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [30, 'El nombre no puede superar 30 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [20, 'El apellido no puede superar 20 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [30, 'El email no puede superar 30 caracteres']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    maxlength: [20, 'La contraseña no puede superar 20 caracteres']
  }
}, { timestamps: true });

module.exports = mongoose.model('Usuario', usuarioSchema);
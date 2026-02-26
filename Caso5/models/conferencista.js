const mongoose = require('mongoose');

const conferencistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    maxlength: [20, 'El nombre no puede superar 20 caracteres']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es obligatorio'],
    trim: true,
    maxlength: [20, 'El apellido no puede superar 20 caracteres']
  },
  cedula: {
    type: String,
    required: [true, 'La cédula es obligatoria'],
    unique: true,
    trim: true,
    maxlength: [20, 'La cédula no puede superar 20 caracteres']
  },
  genero: {
    type: String,
    trim: true,
    maxlength: [20, 'El género no puede superar 20 caracteres']
  },
  fecha_nacimiento: {
    type: String,
    maxlength: [20, 'La fecha no puede superar 20 caracteres']
  },
  ciudad: {
    type: String,
    trim: true,
    maxlength: [20, 'La ciudad no puede superar 20 caracteres']
  },
  direccion: {
    type: String,
    trim: true,
    maxlength: [10, 'La dirección no puede superar 10 caracteres']
  },
  telefono: {
    type: String,
    trim: true,
    maxlength: [20, 'El teléfono no puede superar 20 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: [20, 'El email no puede superar 20 caracteres']
  },
  empresa: {
    type: String,
    trim: true,
    maxlength: [20, 'La empresa no puede superar 20 caracteres']
  }
}, { timestamps: true });

module.exports = mongoose.model('Conferencista', conferencistaSchema);
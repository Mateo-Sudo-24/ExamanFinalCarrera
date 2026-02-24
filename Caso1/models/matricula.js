const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
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
  id_estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: [true, 'El estudiante es obligatorio']
  },
  id_materia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Materia',
    required: [true, 'La materia es obligatoria']
  }
}, { timestamps: true });

module.exports = mongoose.model('Matricula', matriculaSchema);
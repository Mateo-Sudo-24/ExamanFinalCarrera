const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
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
  id_paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: [true, 'El paciente es obligatorio']
  },
  id_especialidad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Especialidad',
    required: [true, 'La especialidad es obligatoria']
  }
}, { timestamps: true });

module.exports = mongoose.model('Cita', citaSchema);
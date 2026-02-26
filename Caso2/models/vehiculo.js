const mongoose = require('mongoose');

const vehiculoSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: [true, 'La marca es obligatoria'],
    trim: true,
    maxlength: [20, 'La marca no puede superar 20 caracteres']
  },
  modelo: {
    type: String,
    required: [true, 'El modelo es obligatorio'],
    trim: true,
    maxlength: [20, 'El modelo no puede superar 20 caracteres']
  },
  anio_f: {
    type: String,
    required: [true, 'El año de fabricación es obligatorio'],
    trim: true,
    maxlength: [4, 'El año no puede superar 4 caracteres']
  },
  placa: {
    type: String,
    required: [true, 'La placa es obligatoria'],    
  },
  color: {
      type: String,
      trim: true,
      maxlength: [20, 'El color no puede superar 20 caracteres']
    },
  tipo_vehiculo: {
      type: String,
      trim: true,
      maxlength: [20, 'El tipo de vehículo no puede superar 20 caracteres']
    },
  kilometraje: {
      type: Number,
      trim: true,
      maxlength: [20, 'El kilometraje no puede superar 20 caracteres']
    },
  descripcion: {
      type: String,
      trim: true,
      maxlength: [20, 'La descripción no puede superar 20 caracteres']
    }  
}, 
{ timestamps: true });

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
const Vehiculo = require('../models/vehiculo.js');

const obtenerVehiculo = async () => {
  return await Vehiculo.find().sort({ createdAt: -1 });
};

const obtenerVehiculoPorId = async (id) => {
  const vehiculo = await Vehiculo.findById(id);
  if (!vehiculo) throw new Error('Vehículo no encontrado.');
  return vehiculo;
};

const crearVehiculo = async (datos) => {
  const existe = await Vehiculo.findOne({ placa: datos.placa });
  if (existe) throw new Error('Ya existe un vehículo con esa placa.');
  return await Vehiculo.create(datos);
};

const actualizarVehiculo = async (id, datos) => {
  const vehiculo = await Vehiculo.findById(id);
  if (!vehiculo) throw new Error('Vehículo no encontrado.');

  if (datos.placa && datos.placa !== vehiculo.placa) {
    const existe = await Vehiculo.findOne({ placa: datos.placa });
    if (existe) throw new Error('Ya existe un vehículo con esa placa.');
  }

  return await Vehiculo.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarVehiculo = async (id) => {
  const vehiculo = await Vehiculo.findById(id);
  if (!vehiculo) throw new Error('Vehículo no encontrado.');
  await Vehiculo.findByIdAndDelete(id);
  return { message: 'Vehículo eliminado correctamente.' };
};

module.exports = { obtenerVehiculo, obtenerVehiculoPorId, crearVehiculo, actualizarVehiculo, eliminarVehiculo };
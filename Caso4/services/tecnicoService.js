const Tecnico = require('../models/tecnico.js');

const obtenerTecnicos = async () => {
  return await Tecnico.find().sort({ createdAt: -1 });
};

const obtenerTecnicoPorId = async (id) => {
  const tecnico = await Tecnico.findById(id);
  if (!tecnico) throw new Error('Técnico no encontrado.');
  return tecnico;
};

const crearTecnico = async (datos) => {
  const existe = await Tecnico.findOne({ cedula: datos.cedula });
  if (existe) throw new Error('Ya existe un técnico con esa cédula.');
  return await Tecnico.create(datos);
};

const actualizarTecnico = async (id, datos) => {
  const tecnico = await Tecnico.findById(id);
  if (!tecnico) throw new Error('Técnico no encontrado.');

  if (datos.cedula && datos.cedula !== tecnico.cedula) {
    const existe = await Tecnico.findOne({ cedula: datos.cedula });
    if (existe) throw new Error('Ya existe un técnico con esa cédula.');
  }

  if (datos.email && datos.email !== tecnico.email) {
    const existeEmail = await Tecnico.findOne({ email: datos.email });
    if (existeEmail) throw new Error('Ya existe un técnico con ese email.');
  }

  return await Tecnico.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarTecnico = async (id) => {
  const tecnico = await Tecnico.findById(id);
  if (!tecnico) throw new Error('Técnico no encontrado.');
  await Tecnico.findByIdAndDelete(id);
  return { message: 'Técnico eliminado correctamente.' };
};

module.exports = { obtenerTecnicos, obtenerTecnicoPorId, crearTecnico, actualizarTecnico, eliminarTecnico };
const Especialidad = require('../models/especialidad.js');

const obtenerEspecialidades = async () => {
  return await Especialidad .find().sort({ createdAt: -1 });
};

const obtenerEspecialidadPorId = async (id) => {
  const especialidad = await Especialidad.findById(id);
  if (!especialidad) throw new Error('Especialidad no encontrada.');
  return especialidad;
};

const crearEspecialidad = async (datos) => {
  const existe = await Especialidad.findOne({ nombre: datos.nombre });
  if (existe) throw new Error('Ya existe una especialidad con ese nombre.');
  return await Especialidad.create(datos);
};

const actualizarEspecialidad = async (id, datos) => {
  const especialidad = await Especialidad.findById(id);
  if (!especialidad) throw new Error('Especialidad no encontrada.');

  if (datos.nombre && datos.nombre !== especialidad.nombre) {
    const existe = await Especialidad.findOne({ nombre: datos.nombre });
    if (existe) throw new Error('Ya existe una especialidad con ese nombre.');
  }

  return await Especialidad.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarEspecialidad = async (id) => {
  const especialidad = await Especialidad.findById(id);
  if (!especialidad) throw new Error('Especialidad no encontrada.');
  await Especialidad.findByIdAndDelete(id);
  return { message: 'Especialidad eliminada correctamente.' };
};

module.exports = { obtenerEspecialidades, obtenerEspecialidadPorId, crearEspecialidad, actualizarEspecialidad, eliminarEspecialidad };
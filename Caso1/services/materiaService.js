const Materia = require('../models/materia.js');

const obtenerMaterias = async (id_usuario) => {
  return await Materia.find({ id_usuario }).sort({ createdAt: -1 });
};

const obtenerMateriaPorId = async (id, id_usuario) => {
  const materia = await Materia.findOne({ _id: id, id_usuario });
  if (!materia) throw new Error('Materia no encontrada.');
  return materia;
};

const crearMateria = async (datos, id_usuario) => {
  const existe = await Materia.findOne({ codigo: datos.codigo, id_usuario });
  if (existe) throw new Error('Ya existe una materia con ese código.');
  return await Materia.create({ ...datos, id_usuario });
};

const actualizarMateria = async (id, datos, id_usuario) => {
  const materia = await Materia.findOne({ _id: id, id_usuario });
  if (!materia) throw new Error('Materia no encontrada.');

  if (datos.codigo && datos.codigo !== materia.codigo) {
    const existe = await Materia.findOne({ codigo: datos.codigo, id_usuario });
    if (existe) throw new Error('Ya existe una materia con ese código.');
  }

  return await Materia.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarMateria = async (id, id_usuario) => {
  const materia = await Materia.findOne({ _id: id, id_usuario });
  if (!materia) throw new Error('Materia no encontrada.');
  await Materia.findByIdAndDelete(id);
  return { message: 'Materia eliminada correctamente.' };
};

module.exports = { obtenerMaterias, obtenerMateriaPorId, crearMateria, actualizarMateria, eliminarMateria };
const Materia = require('../models/materia.js');

const obtenerMaterias = async () => {
  return await Materia.find().sort({ createdAt: -1 });
};

const obtenerMateriaPorId = async (id) => {
  const materia = await Materia.findById(id);
  if (!materia) throw new Error('Materia no encontrada.');
  return materia;
};

const crearMateria = async (datos) => {
  const existe = await Materia.findOne({ codigo: datos.codigo });
  if (existe) throw new Error('Ya existe una materia con ese código.');
  return await Materia.create(datos);
};

const actualizarMateria = async (id, datos) => {
  const materia = await Materia.findById(id);
  if (!materia) throw new Error('Materia no encontrada.');

  if (datos.codigo && datos.codigo !== materia.codigo) {
    const existe = await Materia.findOne({ codigo: datos.codigo });
    if (existe) throw new Error('Ya existe una materia con ese código.');
  }

  return await Materia.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarMateria = async (id) => {
  const materia = await Materia.findById(id);
  if (!materia) throw new Error('Materia no encontrada.');
  await Materia.findByIdAndDelete(id);
  return { message: 'Materia eliminada correctamente.' };
};

module.exports = { obtenerMaterias, obtenerMateriaPorId, crearMateria, actualizarMateria, eliminarMateria };
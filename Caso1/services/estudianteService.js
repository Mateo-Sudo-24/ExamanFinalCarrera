const Estudiante = require('../models/estudiantes.js');

const obtenerEstudiantes = async () => {
  return await Estudiante.find().sort({ createdAt: -1 });
};

const obtenerEstudiantePorId = async (id) => {
  const estudiante = await Estudiante.findById(id);
  if (!estudiante) throw new Error('Estudiante no encontrado.');
  return estudiante;
};

const crearEstudiante = async (datos) => {
  const { cedula, email } = datos;

  const existeCedula = await Estudiante.findOne({ cedula });
  if (existeCedula) throw new Error('Ya existe un estudiante con esa cédula.');

  const existeEmail = await Estudiante.findOne({ email });
  if (existeEmail) throw new Error('Ya existe un estudiante con ese email.');

  return await Estudiante.create(datos);
};

const actualizarEstudiante = async (id, datos) => {
  const estudiante = await Estudiante.findById(id);
  if (!estudiante) throw new Error('Estudiante no encontrado.');

  // Validar unicidad si se cambia cedula o email
  if (datos.cedula && datos.cedula !== estudiante.cedula) {
    const existe = await Estudiante.findOne({ cedula: datos.cedula });
    if (existe) throw new Error('Ya existe un estudiante con esa cédula.');
  }
  if (datos.email && datos.email !== estudiante.email) {
    const existe = await Estudiante.findOne({ email: datos.email });
    if (existe) throw new Error('Ya existe un estudiante con ese email.');
  }

  return await Estudiante.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarEstudiante = async (id) => {
  const estudiante = await Estudiante.findById(id);
  if (!estudiante) throw new Error('Estudiante no encontrado.');
  await Estudiante.findByIdAndDelete(id);
  return { message: 'Estudiante eliminado correctamente.' };
};

module.exports = { obtenerEstudiantes, obtenerEstudiantePorId, crearEstudiante, actualizarEstudiante, eliminarEstudiante };
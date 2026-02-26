const Matricula = require('../models/matricula.js');
const Usuario = require('../models/usuario.js');
const Materia = require('../models/materia.js');

const obtenerMatriculas = async () => {
  return await Matricula.find()
    .populate('id_usuario', 'nombre apellido cedula email')
    .populate('id_materia', 'nombre codigo creditos')
    .sort({ createdAt: -1 });
};

const obtenerMatriculaPorId = async (id) => {
  const matricula = await Matricula.findById(id)
    .populate('id_usuario', 'nombre apellido cedula email')
    .populate('id_materia', 'nombre codigo creditos');
  if (!matricula) throw new Error('Matrícula no encontrada.');
  return matricula;
};

const crearMatricula = async (datos) => {
  const { codigo, id_usuario, id_materia } = datos;

  // Verificar existencia
  const usuarioExiste = await Usuario.findById(id_usuario);
  if (!usuarioExiste) throw new Error('El usuario no existe.');

  const materiaExiste = await Materia.findById(id_materia);
  if (!materiaExiste) throw new Error('La materia no existe.');

  // Evitar matrícula duplicada (mismo usuario + materia)
  const duplicada = await Matricula.findOne({ id_usuario, id_materia });
  if (duplicada) throw new Error('El usuario ya está matriculado en esta materia.');

  const codigoExiste = await Matricula.findOne({ codigo });
  if (codigoExiste) throw new Error('Ya existe una matrícula con ese código.');

  const matricula = await Matricula.create(datos);
  return await matricula.populate([
    { path: 'id_usuario', select: 'nombre apellido cedula email' },
    { path: 'id_materia', select: 'nombre codigo creditos' }
  ]);
};

const actualizarMatricula = async (id, datos) => {
  const matricula = await Matricula.findById(id);
  if (!matricula) throw new Error('Matrícula no encontrada.');

  if (datos.codigo && datos.codigo !== matricula.codigo) {
    const existe = await Matricula.findOne({ codigo: datos.codigo });
    if (existe) throw new Error('Ya existe una matrícula con ese código.');
  }

  return await Matricula.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
    .populate('id_estudiante', 'nombre apellido cedula email')
    .populate('id_materia', 'nombre codigo creditos');
};

const eliminarMatricula = async (id) => {
  const matricula = await Matricula.findById(id);
  if (!matricula) throw new Error('Matrícula no encontrada.');
  await Matricula.findByIdAndDelete(id);
  return { message: 'Matrícula eliminada correctamente.' };
};

module.exports = { obtenerMatriculas, obtenerMatriculaPorId, crearMatricula, actualizarMatricula, eliminarMatricula };
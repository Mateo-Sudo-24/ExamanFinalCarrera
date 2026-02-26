const Paciente = require('../models/pacientes.js');

const obtenerPacientes = async () => {
  return await Paciente.find().sort({ createdAt: -1 });
};

const obtenerPacientePorId = async (id) => {
  const paciente = await Paciente.findById(id);
  if (!paciente) throw new Error('Paciente no encontrado.');
  return paciente;
};

const crearPaciente = async (datos) => {
  const { email } = datos;

  const existeEmail = await Paciente.findOne({ email });
  if (existeEmail) throw new Error('Ya existe un paciente con ese email.');

  return await Paciente.create(datos);
};

const actualizarPaciente = async (id, datos) => {
  const paciente = await Paciente.findById(id);
  if (!paciente) throw new Error('Paciente no encontrado.');

  // Validar unicidad del email si se está actualizando
  if (datos.email && datos.email !== paciente.email) {
    const existe = await Paciente.findOne({ email: datos.email });
    if (existe) throw new Error('Ya existe un paciente con ese email.');
  }

  return await Paciente.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarPaciente = async (id) => {
  const paciente = await Paciente.findById(id);
  if (!paciente) throw new Error('Paciente no encontrado.');
  await Paciente.findByIdAndDelete(id);
  return { message: 'Paciente eliminado correctamente.' };
};

module.exports = { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, eliminarPaciente };
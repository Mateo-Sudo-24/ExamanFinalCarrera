const Cita = require('../models/cita.js');
const Paciente = require('../models/pacientes.js');
const Especialidad = require('../models/especialidad.js');

const obtenerCitas = async () => {
  return await Cita.find()
    .populate('id_paciente', 'nombre apellido cedula email')
    .populate('id_especialidad', 'nombre codigo descripcion')
    .sort({ createdAt: -1 });
};

const obtenerCitaPorId = async (id) => {
  const cita = await Cita.findById(id)
    .populate('id_paciente', 'nombre apellido cedula email')
    .populate('id_especialidad', 'nombre codigo descripcion');
  if (!cita) throw new Error('Cita no encontrada.');
  return cita;
};

const crearCita = async (datos) => {
  const { codigo, id_paciente, id_especialidad } = datos;

  // Verificar existencia
  const pacienteExiste = await Paciente.findById(id_paciente);
  if (!pacienteExiste) throw new Error('El paciente no existe.');

  const especialidadExiste = await Especialidad.findById(id_especialidad);
  if (!especialidadExiste) throw new Error('La especialidad no existe.'); 

  const citaExiste = await Cita.findById(id_materia);
  if (!citaExiste) throw new Error('La cita no existe.');

  // Evitar cita duplicada (mismo paciente + especialidad)
  const duplicada = await Cita.findOne({ id_paciente, id_especialidad });
  if (duplicada) throw new Error('El paciente ya tiene una cita en esta especialidad.');

  const codigoExiste = await Cita.findOne({ codigo });
  if (codigoExiste) throw new Error('Ya existe una cita con ese código.');

  const cita = await Cita.create(datos);
  return await cita.populate([
    { path: 'id_paciente', select: 'nombre apellido cedula email' },
    { path: 'id_especialidad', select: 'nombre codigo descripcion' }
  ]);
};

const actualizarCita = async (id, datos) => {
  const cita = await Cita.findById(id);
  if (!cita) throw new Error('Cita no encontrada.');

  if (datos.codigo && datos.codigo !== cita.codigo) {
    const existe = await Cita.findOne({ codigo: datos.codigo });
    if (existe) throw new Error('Ya existe una cita con ese código.');
  }

  return await Cita.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
    .populate('id_paciente', 'nombre apellido cedula email')
    .populate('id_especialidad', 'nombre codigo descripcion');
};

const eliminarCita = async (id) => {
  const cita = await Cita.findById(id);
  if (!cita) throw new Error('Cita no encontrada.');
  await Cita.findByIdAndDelete(id);
  return { message: 'Cita eliminada correctamente.' };
};

module.exports = { obtenerCitas, obtenerCitaPorId, crearCita, actualizarCita, eliminarCita };
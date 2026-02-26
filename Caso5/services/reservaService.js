const Reserva = require('../models/reserva.js');
const Conferencista = require('../models/conferencista.js');
const Auditorio = require('../models/auditorio.js');

const obtenerReservas = async () => {
  return await Reserva.find()
    .populate('id_conferencista', 'nombre apellido cedula email')
    .populate('id_auditorio', 'nombre cedula capacidad')
    .sort({ createdAt: -1 });
};

const obtenerReservaPorId = async (id) => {
  const reserva = await Reserva.findById(id)
    .populate('id_conferencista', 'nombre apellido cedula email')
    .populate('id_auditorio', 'nombre cedula capacidad');
  if (!reserva) throw new Error('Reserva no encontrada.');
  return reserva;
};

const crearReserva = async (datos) => {
  const { codigo, id_conferencista, id_auditorio } = datos;

  // Verificar existencia
  const conferencistaExiste = await Conferencista.findById(id_conferencista);
  if (!conferencistaExiste) throw new Error('El conferencista no existe.');

  const auditorioExiste = await Auditorio.findById(id_auditorio);
  if (!auditorioExiste) throw new Error('El auditorio no existe.');

  // Evitar reserva duplicada (mismo conferencista + auditorio)
  const duplicada = await Reserva.findOne({ id_conferencista, id_auditorio });
  if (duplicada) throw new Error('El conferencista ya tiene una reserva para este auditorio.');

  const codigoExiste = await Reserva.findOne({ codigo });
  if (codigoExiste) throw new Error('Ya existe una reserva con ese código.');

  const reserva = await Reserva.create(datos);
  return await reserva.populate([
    { path: 'id_conferencista', select: 'nombre apellido cedula email' },
    { path: 'id_auditorio', select: 'nombre cedula capacidad' }
  ]);
};

const actualizarReserva = async (id, datos) => {
  const reserva = await Reserva.findById(id);
  if (!reserva) throw new Error('Reserva no encontrada.');

  if (datos.codigo && datos.codigo !== reserva.codigo) {
    const existe = await Reserva.findOne({ codigo: datos.codigo });
    if (existe) throw new Error('Ya existe una reserva con ese código.');
  }

  return await Reserva.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
    .populate('id_conferencista', 'nombre apellido cedula email')
    .populate('id_auditorio', 'nombre cedula capacidad');
};

const eliminarReserva = async (id) => {
  const reserva = await Reserva.findById(id);
  if (!reserva) throw new Error('Reserva no encontrada.');
  await Reserva.findByIdAndDelete(id);
  return { message: 'Reserva eliminada correctamente.' };
};

module.exports = { obtenerReservas, obtenerReservaPorId, crearReserva, actualizarReserva, eliminarReserva };
const Reserva = require('../models/reserva.js');
const Cliente = require('../models/clientes.js');
const Vehiculo = require('../models/vehiculo.js');

const obtenerReservas = async () => {
  return await Reserva.find()
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_vehiculo', 'marca modelo placa color tipo_vehiculo kilometraje descripcion')
    .sort({ createdAt: -1 });
};

const obtenerReservaPorId = async (id) => {
  const reserva = await Reserva.findById(id)
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_vehiculo', 'marca modelo placa color tipo_vehiculo kilometraje descripcion');
  if (!reserva) throw new Error('Reserva no encontrada.');
  return reserva;
};

const crearReserva = async (datos) => {
  const { codigo, id_cliente, id_vehiculo } = datos;

  // Verificar existencia
  const clienteExiste = await Cliente.findById(id_cliente);
  if (!clienteExiste) throw new Error('El cliente no existe.');

  const vehiculoExiste = await Vehiculo.findById(id_vehiculo);
  if (!vehiculoExiste) throw new Error('El vehículo no existe.');

  // Evitar reserva duplicada (mismo cliente + vehículo)
  const duplicada = await Reserva.findOne({ id_cliente, id_vehiculo });
  if (duplicada) throw new Error('El cliente ya tiene una reserva para este vehículo.');

  const codigoExiste = await Reserva.findOne({ codigo });
  if (codigoExiste) throw new Error('Ya existe una reserva con ese código.');

  const reserva = await Reserva.create(datos);
  return await reserva.populate([
    { path: 'id_cliente', select: 'nombre apellido cedula email' },
    { path: 'id_vehiculo', select: 'marca modelo placa color tipo_vehiculo kilometraje descripcion' }
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
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_vehiculo', 'marca modelo placa color tipo_vehiculo kilometraje descripcion');
};

const eliminarReserva = async (id) => {
  const reserva = await Reserva.findById(id);
  if (!reserva) throw new Error('Reserva no encontrada.');
  await Reserva.findByIdAndDelete(id);
  return { message: 'Reserva eliminada correctamente.' };
};

module.exports = { obtenerReservas, obtenerReservaPorId, crearReserva, actualizarReserva, eliminarReserva };
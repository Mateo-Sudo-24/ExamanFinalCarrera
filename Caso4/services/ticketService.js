const Ticket = require('../models/ticket.js');
const Cliente = require('../models/clientes.js');
const Tecnico = require('../models/tecnico.js');

const obtenerTickets = async () => {
  return await Ticket.find()
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_tecnico', 'nombre apellido cedula email')
    .sort({ createdAt: -1 });
};

const obtenerTicketPorId = async (id) => {
  const ticket = await Ticket.findById(id)
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_tecnico', 'nombre apellido cedula email');
  if (!ticket) throw new Error('Ticket no encontrado.');
  return ticket;
};

const crearTicket = async (datos) => {
  const { codigo, id_cliente, id_tecnico } = datos;

  // Verificar existencia
  const clienteExiste = await Cliente.findById(id_cliente);
  if (!clienteExiste) throw new Error('El cliente no existe.');

  const tecnicoExiste = await Tecnico.findById(id_tecnico);
  if (!tecnicoExiste) throw new Error('El técnico no existe.');

  const ticketExiste = await Ticket.findOne({ codigo });
  if (ticketExiste) throw new Error('Ya existe un ticket con ese código.');

  // Evitar ticket duplicado (mismo cliente + técnico)
  const duplicada = await Ticket.findOne({ id_cliente, id_tecnico });
  if (duplicada) throw new Error('Ya existe un ticket para este cliente y técnico.');

  const ticket = await Ticket.create(datos);
  return await ticket.populate([
    { path: 'id_cliente', select: 'nombre apellido cedula email' },
    { path: 'id_tecnico', select: 'nombre apellido cedula email' }
  ]);
};

const actualizarTicket = async (id, datos) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new Error('Ticket no encontrado.');

  if (datos.codigo && datos.codigo !== ticket.codigo) {
    const existe = await Ticket.findOne({ codigo: datos.codigo });
    if (existe) throw new Error('Ya existe un ticket con ese código.');
  }

  return await Ticket.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
    .populate('id_cliente', 'nombre apellido cedula email')
    .populate('id_tecnico', 'nombre apellido cedula email');
};

const eliminarTicket = async (id) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) throw new Error('Ticket no encontrado.');
  await Ticket.findByIdAndDelete(id);
  return { message: 'Ticket eliminado correctamente.' };
};

module.exports = { obtenerTickets, obtenerTicketPorId, crearTicket, actualizarTicket, eliminarTicket };
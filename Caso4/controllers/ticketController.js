const service = require('../services/ticketService');

const getAll = async (req, res) => {
  try {
    const data = await service.obtenerTickets();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.obtenerTicketPorId(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await service.crearTicket(req.body);
    res.status(201).json({ message: 'Ticket creado correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await service.actualizarTicket(req.params.id, req.body);
    res.status(200).json({ message: 'Ticket actualizado correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await service.eliminarTicket(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
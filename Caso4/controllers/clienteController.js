const service = require('../services/clienteService');

const getAll = async (req, res) => {
  try {
    const data = await service.obtenerClientes();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.obtenerClientePorId(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await service.crearCliente(req.body);
    res.status(201).json({ message: 'Cliente creado correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await service.actualizarCliente(req.params.id, req.body);
    res.status(200).json({ message: 'Cliente actualizado correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await service.eliminarCliente(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
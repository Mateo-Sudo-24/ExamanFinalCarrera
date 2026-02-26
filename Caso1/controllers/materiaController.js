const service = require('../services/materiaService');

const getAll = async (req, res) => {
  try {
    const data = await service.obtenerMaterias(req.usuario.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.obtenerMateriaPorId(req.params.id, req.usuario.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await service.crearMateria(req.body, req.usuario.id);
    res.status(201).json({ message: 'Materia creada correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await service.actualizarMateria(req.params.id, req.body, req.usuario.id);
    res.status(200).json({ message: 'Materia actualizada correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await service.eliminarMateria(req.params.id, req.usuario.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
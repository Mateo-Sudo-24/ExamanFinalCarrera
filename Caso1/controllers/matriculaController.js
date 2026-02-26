const service = require('../services/matriculaService');

const getAll = async (req, res) => {
  try {
    const data = await service.obtenerMatriculas(req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const data = await service.obtenerMatriculaPorId(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const data = await service.crearMatricula(req.body);
    res.status(201).json({ message: 'Matrícula creada correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const data = await service.actualizarMatricula(req.params.id, req.body);
    res.status(200).json({ message: 'Matrícula actualizada correctamente.', data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await service.eliminarMatricula(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
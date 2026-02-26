const Auditorio = require('../models/auditorio.js');

const obtenerAuditorios = async () => {
  return await Auditorio.find().sort({ createdAt: -1 });
};

const obtenerAuditorioPorId = async (id) => {
  const auditorio = await Auditorio.findById(id);
  if (!auditorio) throw new Error('Auditorio no encontrado.');
  return auditorio;
};

const crearAuditorio = async (datos) => {
  const existe = await Auditorio.findOne({ codigo: datos.codigo });
  if (existe) throw new Error('Ya existe un auditorio con ese código.');
  return await Auditorio.create(datos);
};

const actualizarAuditorio = async (id, datos) => {
  const auditorio = await Auditorio.findById(id);
  if (!auditorio) throw new Error('Auditorio no encontrado.');

  if (datos.cedula && datos.cedula !== auditorio.cedula) {
    const existe = await Auditorio.findOne({ cedula: datos.cedula });
    if (existe) throw new Error('Ya existe un auditorio con esa cédula.');
  }

  return await Auditorio.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarAuditorio = async (id) => {
  const auditorio = await Auditorio.findById(id);
  if (!auditorio) throw new Error('Auditorio no encontrado.');
  await Auditorio.findByIdAndDelete(id);
  return { message: 'Auditorio eliminado correctamente.' };
};

module.exports = { obtenerAuditorios, obtenerAuditorioPorId, crearAuditorio, actualizarAuditorio, eliminarAuditorio };
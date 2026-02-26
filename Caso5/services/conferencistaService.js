const Conferencista = require('../models/conferencista.js');

const obtenerConferencistas = async () => {
  return await Conferencista.find().sort({ createdAt: -1 });
};

const obtenerConferencistaPorId = async (id) => {
  const conferencista = await Conferencista.findById(id);
  if (!conferencista) throw new Error('Conferencista no encontrado.');
  return conferencista;
};

const crearConferencista = async (datos) => {
  const { cedula, email } = datos;

  const existeCedula = await Conferencista.findOne({ cedula });
  if (existeCedula) throw new Error('Ya existe un conferencista con esa cédula.');

  const existeEmail = await Conferencista.findOne({ email });
  if (existeEmail) throw new Error('Ya existe un conferencista con ese email.');

  return await Conferencista.create(datos);
};

const actualizarConferencista = async (id, datos) => {
  const conferencista = await Conferencista.findById(id);
  if (!conferencista) throw new Error('Conferencista no encontrado.');

  // Validar unicidad si se cambia cedula o email
  if (datos.cedula && datos.cedula !== conferencista.cedula) {
    const existe = await Conferencista.findOne({ cedula: datos.cedula });
    if (existe) throw new Error('Ya existe un conferencista con esa cédula.');
  }
  if (datos.email && datos.email !== conferencista.email) {
    const existe = await Conferencista.findOne({ email: datos.email });
    if (existe) throw new Error('Ya existe un conferencista con ese email.');
  }

  return await Conferencista.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarConferencista = async (id) => {
  const conferencista = await Conferencista.findById(id);
  if (!conferencista) throw new Error('Conferencista no encontrado.');
  await Conferencista.findByIdAndDelete(id);
  return { message: 'Conferencista eliminado correctamente.' };
};

module.exports = { obtenerConferencistas, obtenerConferencistaPorId, crearConferencista, actualizarConferencista, eliminarConferencista };
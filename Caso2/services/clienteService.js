const Cliente = require('../models/clientes.js');

const obtenerClientes = async () => {
  return await Cliente.find().sort({ createdAt: -1 });
};

const obtenerClientePorId = async (id) => {
  const estudiante = await Cliente.findById(id);
  if (!estudiante) throw new Error('Cliente no encontrado.');
  return estudiante;
};

const crearCliente = async (datos) => {
  const { cedula, email } = datos;

  const existeCedula = await Cliente.findOne({ cedula });
  if (existeCedula) throw new Error('Ya existe un cliente  con esa cédula.');

  const existeEmail = await Cliente.findOne({ email });
  if (existeEmail) throw new Error('Ya existe un cliente   con ese email.');

  return await Cliente.create(datos);
};

const actualizarCliente = async (id, datos) => {
  const cliente = await Cliente.findById(id);
  if (!cliente) throw new Error('Cliente no encontrado.');

  // Validar unicidad si se cambia cedula o email
  if (datos.cedula && datos.cedula !== cliente.cedula) {
    const existe = await Cliente.findOne({ cedula: datos.cedula });
    if (existe) throw new Error('Ya existe un cliente con esa cédula.');
  }
  if (datos.email && datos.email !== cliente.email) {
    const existe = await Cliente.findOne({ email: datos.email });
    if (existe) throw new Error('Ya existe un cliente con ese email.');
  }

  return await Cliente.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
};

const eliminarCliente = async (id) => {
  const cliente = await Cliente.findById(id);
  if (!cliente) throw new Error('Cliente no encontrado.');
  await Cliente.findByIdAndDelete(id);
  return { message: 'Cliente eliminado correctamente.' };
};

module.exports = { obtenerClientes, obtenerClientePorId, crearCliente, actualizarCliente, eliminarCliente };
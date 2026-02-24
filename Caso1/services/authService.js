const Usuario = require('../models/usuario.js');

// Registrar usuario (contraseña en texto plano para pruebas)
const registrarUsuario = async (datos) => {
  const { nombre, apellido, email, password } = datos;

  if (!nombre || !apellido || !email || !password) {
    throw new Error('Todos los campos son obligatorios.');
  }

  const existe = await Usuario.findOne({ email });
  if (existe) throw new Error('El email ya está registrado.');

  const usuario = await Usuario.create({ nombre, apellido, email, password });
  return { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email };
};

// Login con validación simple por if
const loginUsuario = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email y contraseña son obligatorios.');
  }

  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    throw new Error('Usuario o contraseña incorrectos.');
  }

  if (usuario.password !== password) {
    throw new Error('Usuario o contraseña incorrectos.');
  }

  // Retornar datos del usuario para que el frontend los guarde en sesión
  return {
    id: usuario._id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    email: usuario.email
  };
};

module.exports = { registrarUsuario, loginUsuario };
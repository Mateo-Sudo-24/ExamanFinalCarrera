const { registrarUsuario, loginUsuario } = require('../services/authService');

const registrar = async (req, res) => {
  try {
    const usuario = await registrarUsuario(req.body);
    res.status(201).json({ message: 'Usuario registrado correctamente.', usuario });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await loginUsuario(email, password);
    res.status(200).json({
      message: `Bienvenido - ${usuario.nombre} ${usuario.apellido}`,
      usuario
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { registrar, login };
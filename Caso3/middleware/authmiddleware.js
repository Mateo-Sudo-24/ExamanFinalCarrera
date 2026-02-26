// Middleware simple de sesión para pruebas
// El frontend debe enviar en el header: x-usuario-id y x-usuario-nombre

const verificarSesion = (req, res, next) => {
  const usuarioId = req.headers['x-usuario-id'];
  const usuarioNombre = req.headers['x-usuario-nombre'];

  if (!usuarioId || !usuarioNombre) {
    return res.status(401).json({ message: 'Acceso denegado. No hay sesión activa.' });
  }

  req.usuario = { id: usuarioId, nombre: usuarioNombre };
  next();
};

module.exports = verificarSesion;
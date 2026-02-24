const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'Caso1' });
    console.log('MongoDB conectado a la base de datos: Caso1');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
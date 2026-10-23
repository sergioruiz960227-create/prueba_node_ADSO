// Punto de entrada del servicio web de registro e inicio de sesión
require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const { probarConexion } = require('./src/config/db');

const app = express();
const puerto = process.env.PORT || 3000;

// Permite recibir y leer cuerpos de petición en formato JSON
app.use(express.json());

// Todas las rutas de autenticación cuelgan de /api/auth
app.use('/api', authRoutes);

// Ruta raíz para comprobar que el servicio está activo
app.get('/', (req, res) => {
    res.json({ ok: true, mensaje: 'Servicio web de autenticación activo' });
});

// Arranca el servidor solo si la base de datos responde
async function iniciarServidor() {
    try {
        await probarConexion();
        app.listen(puerto, () => {
            console.log(`Servidor escuchando en http://localhost:${puerto}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor');
        process.exit(1);
    }
}

iniciarServidor();
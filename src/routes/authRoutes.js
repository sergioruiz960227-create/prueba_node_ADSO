// Rutas de autenticación del servicio web
const { Router } = require('express');
const { registrar, iniciarSesion } = require('../controllers/authController');

const router = Router();

// POST /api/auth/register -> registra un usuario nuevo
router.post('/register', registrar);

// POST /api/auth/login -> valida usuario y contraseña
router.post('/login', iniciarSesion);

module.exports = router;
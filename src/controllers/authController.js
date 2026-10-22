// Controlador de autenticación: registro e inicio de sesión de usuarios
const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

// Rondas de cifrado de bcrypt: más rondas = más seguro, pero más lento
const RONDAS_CIFRADO = 10;

// Valida que usuario y contraseña lleguen como texto y no estén vacíos
function datosValidos(usuario, contrasena) {
    return typeof usuario === 'string' && typeof contrasena === 'string'
        && usuario.trim() !== '' && contrasena !== '';
}

// Registra un nuevo usuario guardando su contraseña cifrada
async function registrar(req, res) {
    const { usuario, contrasena } = req.body || {};
    if (!datosValidos(usuario, contrasena)) {
        return res.status(400).json({ ok: false, mensaje: 'Usuario y contraseña son obligatorios' });
    }
    try {
        const hash = await bcrypt.hash(contrasena, RONDAS_CIFRADO);
        await pool.query('INSERT INTO usuarios (usuario, contrasena) VALUES (?, ?)', [usuario.trim(), hash]);
        return res.status(201).json({ ok: true, mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ ok: false, mensaje: 'El usuario ya existe' });
        }
        console.error('Error en el registro:', error.message);
        return res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

// Inicia sesión: compara la contraseña recibida con el hash guardado
async function iniciarSesion(req, res) {
    const { usuario, contrasena } = req.body || {};
    if (!datosValidos(usuario, contrasena)) {
        return res.status(400).json({ ok: false, mensaje: 'Usuario y contraseña son obligatorios' });
    }
    try {
        const [filas] = await pool.query('SELECT contrasena FROM usuarios WHERE usuario = ?', [usuario.trim()]);
        // Mismo mensaje si falla el usuario o la contraseña, para no dar pistas
        const correcta = filas.length > 0 && await bcrypt.compare(contrasena, filas[0].contrasena);
        if (!correcta) {
            return res.status(401).json({ ok: false, mensaje: 'Error en la autenticación' });
        }
        return res.status(200).json({ ok: true, mensaje: 'Autenticación satisfactoria' });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        return res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
    }
}

module.exports = { registrar, iniciarSesion };
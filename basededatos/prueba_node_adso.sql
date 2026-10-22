-- Base de datos del servicio web de registro e inicio de sesión
CREATE DATABASE IF NOT EXISTS prueba_node_adso
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE prueba_node_adso;

-- Tabla de usuarios registrados
CREATE TABLE IF NOT EXISTS usuarios (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_usuarios_usuario (usuario)
) ENGINE=InnoDB;
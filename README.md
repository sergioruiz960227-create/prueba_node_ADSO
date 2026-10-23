# Servicio web de registro e inicio de sesión

Evidencia GA7-220501096-AA5-EV01 · Diseño y desarrollo de servicios web - caso.
Aprendiz: Sergio Andrés Ruiz Sanabria · Programa: Análisis y Desarrollo de Software (SENA).

Servicio web (API REST) que permite registrar usuarios e iniciar sesión.
Recibe un usuario y una contraseña; si la autenticación es correcta responde con un mensaje de
autenticación satisfactoria, y en caso contrario devuelve un error de autenticación.

## Tecnologías

Node.js, Express, MySQL (XAMPP), mysql2, bcryptjs y dotenv.

## Estructura del proyecto

```
app.js                          Punto de entrada: arma y arranca el servidor
src/
  config/db.js                  Conexión a MySQL (pool de conexiones)
  controllers/authController.js Lógica de registro e inicio de sesión
  routes/authRoutes.js          Definición de las rutas
database/                       Script SQL de la base de datos
.env.example                    Plantilla de configuración
```

## Instalación

1. Instalar las dependencias: `npm install`
2. Encender MySQL en XAMPP e importar en phpMyAdmin el archivo `.sql` de la carpeta `database`.
3. Copiar `.env.example` como `.env` (los valores por defecto sirven para XAMPP).
4. Arrancar el servicio: `npm start` (o `npm run dev` para que se reinicie al guardar cambios).

El servicio queda disponible en `http://localhost:3000`.

## Endpoints

| Método | Ruta            | Descripción                                |
|--------|-----------------|--------------------------------------------|
| POST   | `/api/register` | Registra un usuario nuevo                  |
| POST   | `/api/login`    | Valida el usuario y la contraseña          |

Ambos reciben un JSON con este formato:

```json
{ "usuario": "admin", "contrasena": "Clave123" }
```

### Respuestas

| Caso                           | Código | Mensaje                                  |
|--------------------------------|--------|------------------------------------------|
| Registro correcto              | 201    | Usuario registrado correctamente         |
| Usuario ya existente           | 409    | El usuario ya existe                     |
| Datos incompletos              | 400    | Usuario y contraseña son obligatorios    |
| Login correcto                 | 200    | Autenticación satisfactoria              |
| Usuario o contraseña erróneos  | 401    | Error en la autenticación                |
| Error del servidor             | 500    | Error interno del servidor               |

## Seguridad

- Las contraseñas se guardan cifradas con bcrypt, nunca en texto plano.
- Las consultas a la base de datos son preparadas (`?`), lo que evita la inyección SQL.
- El login da el mismo mensaje si falla el usuario o la contraseña, para no revelar si el usuario existe.
# 📚 Backend – Sistema de Gestión de Matrículas

Backend desarrollado con **Node.js + Express + MongoDB (Mongoose)** siguiendo el patrón **MVC** con capa de servicios.

Base de datos en cluster MongoDB Atlas → colección **`Caso1`**

---

## 🗂 Estructura del proyecto

```
backend/
├── config/
│   └── db.js                  # Conexión a MongoDB Atlas (Caso1)
├── models/
│   ├── Estudiante.js
│   ├── Materia.js
│   ├── Matricula.js
│   └── Usuario.js
├── services/
│   ├── authService.js
│   ├── estudianteService.js
│   ├── materiaService.js
│   └── matriculaService.js
├── controllers/
│   ├── authController.js
│   ├── estudianteController.js
│   ├── materiaController.js
│   └── matriculaController.js
├── routes/
│   ├── authRoutes.js
│   ├── estudianteRoutes.js
│   ├── materiaRoutes.js
│   └── matriculaRoutes.js
├── middleware/
│   └── authMiddleware.js      # Verificación simple de sesión por headers
├── .env.example
├── .gitignore
├── app.js
└── package.json
```

---

## ⚙️ Instalación

```bash
npm install
```

Crea tu archivo `.env`:

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/Caso1
```

```bash
npm run dev   # desarrollo
npm start     # producción
```

---

## 🔐 Módulo – Auth

| Método | Endpoint             | Descripción       | Protegido |
|--------|----------------------|-------------------|-----------|
| POST   | `/api/auth/register` | Registrar usuario | No        |
| POST   | `/api/auth/login`    | Iniciar sesión    | No        |

### Body – Register
```json
{ "nombre": "Byron", "apellido": "Loarte", "email": "admin@demo.com", "password": "123456" }
```

### Body – Login
```json
{ "email": "admin@demo.com", "password": "123456" }
```

### Respuesta exitosa – Login
```json
{
  "message": "Bienvenido - Byron Loarte",
  "usuario": { "id": "...", "nombre": "Byron", "apellido": "Loarte", "email": "admin@demo.com" }
}
```

> El frontend debe guardar `usuario.id` y `usuario.nombre` (ej. en `localStorage` o `sessionStorage`) y enviarlos en cada petición protegida como headers:
> ```
> x-usuario-id: <id>
> x-usuario-nombre: <nombre>
> ```

---

## 👤 Módulo – Estudiantes

| Método | Endpoint               | Descripción           |
|--------|------------------------|-----------------------|
| GET    | `/api/estudiantes`     | Listar todos          |
| GET    | `/api/estudiantes/:id` | Obtener por ID        |
| POST   | `/api/estudiantes`     | Crear estudiante      |
| PUT    | `/api/estudiantes/:id` | Actualizar estudiante |
| DELETE | `/api/estudiantes/:id` | Eliminar estudiante   |

### Body
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "cedula": "1234567890",
  "fecha_nacimiento": "2000-01-15",
  "ciudad": "Quito",
  "direccion": "Av. 10",
  "telefono": "0991234567",
  "email": "juan@mail.com"
}
```

---

## 📖 Módulo – Materias

| Método | Endpoint             | Descripción        |
|--------|----------------------|--------------------|
| GET    | `/api/materias`      | Listar todas       |
| GET    | `/api/materias/:id`  | Obtener por ID     |
| POST   | `/api/materias`      | Crear materia      |
| PUT    | `/api/materias/:id`  | Actualizar materia |
| DELETE | `/api/materias/:id`  | Eliminar materia   |

### Body
```json
{ "nombre": "Matemáticas", "codigo": "MAT001", "descripcion": "Cálculo I", "creditos": "4" }
```

---

## 📋 Módulo – Matrículas

| Método | Endpoint                | Descripción            |
|--------|-------------------------|------------------------|
| GET    | `/api/matriculas`       | Listar todas           |
| GET    | `/api/matriculas/:id`   | Obtener por ID         |
| POST   | `/api/matriculas`       | Crear matrícula        |
| PUT    | `/api/matriculas/:id`   | Actualizar matrícula   |
| DELETE | `/api/matriculas/:id`   | Eliminar matrícula     |

### Body
```json
{
  "codigo": 1001,
  "descripcion": "Matrícula 2025-B",
  "id_estudiante": "<ObjectId>",
  "id_materia": "<ObjectId>"
}
```

> La respuesta incluye datos del estudiante y materia vía `populate`.

---

## 🔒 Autenticación (simple)

El middleware `authMiddleware.js` verifica que existan los headers `x-usuario-id` y `x-usuario-nombre`. Si no están presentes, retorna `401`.

```js
// Ejemplo en el frontend al hacer fetch
headers: {
  'Content-Type': 'application/json',
  'x-usuario-id': usuarioGuardado.id,
  'x-usuario-nombre': usuarioGuardado.nombre
}
```

---

## 📦 Dependencias

| Paquete  | Uso                        |
|----------|----------------------------|
| express  | Framework web              |
| mongoose | ODM para MongoDB           |
| dotenv   | Variables de entorno       |
| cors     | Cross-Origin Resource Sharing |
| nodemon  | Recarga en desarrollo      |

# 🩺 Sistema de Reportes de Incidentes Clínicos – Backend

Este es el sistema backend del proyecto **Clinic Incident Reporting**, una plataforma web que permite al personal hospitalario o clínico enviar reportes de incidentes de forma anónima. El sistema contribuye a mejorar la seguridad y la comunicación mediante la gestión segura y organizada de estos reportes por parte del equipo administrativo.

Este backend está diseñado para conectarse con el [Frontend de Clínica](https://github.com/Project-CSF-2025/clinica-front-public), una interfaz desarrollada en React donde los usuarios envían los reportes y los administradores los gestionan.

---

## Funcionalidades

- Sistema de inicio de sesión para administradores con autenticación segura mediante JWT  
- Recepción y almacenamiento de reportes anónimos con posibilidad de incluir correo electrónico  
- Gestión de archivos adjuntos (solo imágenes y documentos, máximo 10MB)  
- Intercambio de mensajes entre usuarios y administradores por cada reporte  
- Historial de cambios de estado de los reportes (NO LEIDO → EN PROCESO → RESUELTO)  
- Envío de notificaciones por correo cuando hay mensajes o cambios de estado  
- Soporte para dashboards en el frontend con filtros, visualización y estadísticas  
- Uso de archivos JSON para los menús desplegables (departamentos, profesiones, consecuencias), facilitando la escalabilidad del sistema  

---

## Tecnologías Utilizadas

- Node.js con Express (API REST)
- SQL Server
- Multer para gestión de archivos
- JWT para autenticación
- Nodemailer para envío de correos electrónicos
- bcrypt para encriptación de contraseñas

---

## Dependencias

Principales paquetes de npm utilizados:

- express  
- mssql  
- jsonwebtoken  
- bcrypt  
- dotenv  
- nodemailer  
- multer  
- cors  
- uuid  
- fs / path (módulos internos de Node.js)  

Para instalar todas las dependencias:

```bash
npm install
````

---

## Cómo Ejecutar Localmente

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Project-CSF-2025/clinica-back-public.git
cd clinica-back-public
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y agrega:

```ini
DB_HOST=localhost
DB_PORT=1433
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=clinica

JWT_SECRET=your_jwt_secret_key
MAIL_USER=your_email@example.com
MAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
```

**Importante:** Nunca subas tu archivo real `.env` a un repositorio público.
Asegúrate de que esté listado en tu archivo `.gitignore`.

### 4. Ejecutar el Servidor

```bash
nodemon index.js
```

El servidor backend se iniciará en el puerto que esté definido en tu archivo `index.js`.

---

## Estructura de la Base de Datos

Este proyecto utiliza **SQL Server**. El esquema incluye las siguientes tablas:

* **Users**: Usuarios anónimos o identificados
* **Reports**: Detalles del incidente (departamento, profesión, asunto, etc.)
* **Report\_Status\_History**: Historial de cambios de estado por reporte
* **Admins**: Datos de acceso y recuperación de contraseña
* **Messages**: Comunicación entre usuario y administrador
* **Attachments**: Archivos adjuntos (imágenes o PDFs)
* **Admin\_Notes**: Notas privadas para uso interno del administrador

Para crear una cuenta de administrador, genera una contraseña encriptada con `bcrypt` e insértala manualmente en la base de datos.

---

## Limitaciones

* Los tokens JWT expiran a los 15 minutos
* Máximo de 2 archivos adjuntos por reporte
* Solo se aceptan archivos PDF e imágenes
* El tamaño máximo total de los archivos es de 10MB
* Los códigos de reporte son únicos, generados aleatoriamente y verificados en el backend (combinaciones en trillones)

---

## Autora

Este backend fue desarrollado por:

* **Pragati Juyal**

Como parte de un proyecto escolar full-stack de desarrollo web.

---

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](./LICENSE).
Se proporciona “tal cual” y la autora no se hace responsable de posibles daños.
Se permite su uso en producción siempre que se otorgue el crédito correspondiente.
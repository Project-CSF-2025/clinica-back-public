# 🩺 Clinic Incident Reporting – Backend

This is the backend system for Clinic Incident Reporting, a web-based platform that allows hospital or clinic staff to send anonymous incident reports to help improve safety and communication. Admins can manage reports, track their status, and respond to users securely.

This backend is meant to connect with the [Clinica Frontend](https://github.com/Project-CSF-2025/clinica-front-public), a React-based interface where users submit reports and admins view and manage them.

---

## Features

- Admin login system using secure JWT authentication
- Receive and store anonymous reports with optional email
- Handle file uploads (images and documents only, max 10MB)
- Exchange messages between users and admins per report
- Track report status history (NO LEIDO → EN PROCESO → RESUELTO)
- Send email notifications when messages or status updates happen
- Support frontend dashboards for viewing reports, stats, and filters
- Uses JSON files for dropdowns (departments, professions, consequences), making the system easily scalable and maintainable

---

## Tech Stack

- Node.js with Express (REST API)
- SQL Server
- Multer for file uploads
- JWT for authentication
- Nodemailer for sending emails
- bcrypt for password hashing

---

## Dependencies

Main npm packages used:

- express
- mssql
- jsonwebtoken
- bcrypt
- dotenv
- nodemailer
- multer
- cors
- uuid
- fs / path (Node.js built-in modules)

Install all dependencies with:

```bash
npm install
````

---

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Project-CSF-2025/clinica-back-public.git
cd clinica-back-public
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root folder and add the following:

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

**Note:** Never upload your real `.env` file to a public repository just Add it inside your .gitignore file.

### 4. Run the Server

```bash
nodemon index.js
```

The backend will start on the port defined in your `index.js` file.

---

## Database Structure

This project uses SQL Server. The schema includes the following tables:

* **Users**: Anonymous or identified users
* **Reports**: Incident details (department, profession, subject, etc.)
* **Report\_Status\_History**: Tracks every status change
* **Admins**: Login credentials and reset token handling
* **Messages**: Chat between admin and user (per report)
* **Attachments**: PDF/image uploads
* **Admin\_Notes**: Private admin-only notes

To create an admin, generate a hashed password using bcrypt and insert it manually into the database.

---

## Limitations

* JWT tokens expire after 15 minutes
* Maximum 2 attachments per report
* Only image and PDF formats are allowed
* Max file size: 10MB total
* Report codes are unique and randomly generated (trillions of combinations)

---

## Authors

This backend was developed by:

* Pragati Juyal
* Kanako Inamine

As part of a full-stack web development school project.

---

## License

This project is provided for educational purposes only.


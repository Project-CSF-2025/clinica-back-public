DROP DATABASE clinica;
-- Create and use the database
CREATE DATABASE IF NOT EXISTS clinica;
USE clinica;

-- Drop existing tables
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Report_Status_History;
DROP TABLE IF EXISTS Admin_Notes;
DROP TABLE IF EXISTS Attachments;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Admins;

-- Users table
CREATE TABLE Users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT NOW()
);
ALTER TABLE Users AUTO_INCREMENT = 2;

INSERT INTO Users (id_user, email) VALUES (1, 'anonymous@clinica.com')
ON DUPLICATE KEY UPDATE email = 'anonymous@clinica.com';

-- Reports table
CREATE TABLE Reports (
    id_report INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL DEFAULT 0,
    report_code VARCHAR(10) UNIQUE,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    suggestions TEXT,
    profession VARCHAR(100) NOT NULL,
    is_consequent ENUM('YES', 'NO') DEFAULT 'NO',
    avoidable ENUM('YES', 'NO') DEFAULT 'NO',
    consequence_type TEXT,
    status ENUM('NO_LEIDO', 'EN_PROCESO', 'RESUELTO', 'ELIMINADO') DEFAULT 'NO_LEIDO',
    is_flagged BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
);

-- Report status history
CREATE TABLE Report_Status_History (
    id_history INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,
    old_status ENUM('NO_LEIDO', 'EN_PROCESO', 'RESUELTO', 'ELIMINADO'),
    new_status ENUM('NO_LEIDO', 'EN_PROCESO', 'RESUELTO', 'ELIMINADO') NOT NULL,
    changed_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

-- Admin notes
CREATE TABLE Admin_Notes (
    id_note INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,
    admin_message TEXT NOT NULL,
    last_update_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

-- Attachments
CREATE TABLE Attachments (
    id_attachment INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,
    attachment_type ENUM('IMAGE', 'DOCUMENT') NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

-- Messages
CREATE TABLE Messages (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,
    sender_type ENUM('USER', 'ADMIN') NOT NULL,
    message_content TEXT NOT NULL,
    created_at DATETIME DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

-- Admins
CREATE TABLE Admins (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    created_at DATETIME DEFAULT NOW()
);

-- Insert admin
INSERT INTO Admins (username, email, password_hash)
VALUES (
  'Pragati',
  'juyalpragati9991@gmail.com',
  '$2b$10$OH9JfnODDpEzEj9s.vqUcOARmeByaowfzMn.d4WY7yBiJwUz6wde.'
);

-- Test user
INSERT INTO Users (email) VALUES ('testuser@example.com');

-- Test report
INSERT INTO Reports (
    id_user, report_code, department, location, subject, description, suggestions,
    profession, is_consequent, avoidable, consequence_type, status
) VALUES (
    1, 'TEST1234', 'CARDIOLOGIA', 'Room 301', 'Broken Equipment',
    'The ECG machine is not functioning properly.',
    'Consider replacing the machine',
    'NURSE', 'YES', 'NO', 'EQUIPMENT_FAILURE', 'NO_LEIDO'
);

-- Test message
INSERT INTO Messages (id_report, sender_type, message_content)
VALUES (1, 'ADMIN', 'Hello, we are reviewing your report.');

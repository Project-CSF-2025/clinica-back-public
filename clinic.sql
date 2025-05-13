USE clinica;
GO

-- Drop the tables if they exist
DROP TABLE IF EXISTS Messages, Attachments, Admin_Notes, Report_Status_History, Reports, Users, Admins;
GO

-- Users Table
CREATE TABLE Users (
    id_user INT IDENTITY(1,1) PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);
GO

-- Reports Table
CREATE TABLE Reports (
    id_report INT IDENTITY(1,1) PRIMARY KEY,
    id_user INT NOT NULL DEFAULT 0,
    report_code VARCHAR(10) UNIQUE,
    department VARCHAR(100) NOT NULL,
    profession VARCHAR(100) NOT NULL,
    location VARCHAR(50) NOT NULL,
    subject VARCHAR(50) NOT NULL,
    description NVARCHAR(1000) NOT NULL,
    is_consequent BIT NULL,
    avoidable BIT NULL,
    consequence_type NVARCHAR(50),
    suggestions NVARCHAR(1000),
    status VARCHAR(20) DEFAULT 'NO LEIDO',
    is_flagged BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    date_time DATETIME NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
);
GO

ALTER TABLE Reports
ADD CONSTRAINT CHK_Reports_Status CHECK (status IN ('NO LEIDO', 'EN PROCESO', 'RESUELTO', 'ELIMINADO'));
GO

-- Report_Status_History Table
CREATE TABLE Report_Status_History (
    id_history INT IDENTITY(1,1) PRIMARY KEY,
    id_report INT NOT NULL,
    old_status VARCHAR(20),
    new_status VARCHAR(20) NOT NULL,
    changed_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);
GO

ALTER TABLE Report_Status_History
ADD CONSTRAINT CHK_History_Status_Old CHECK (old_status IN ('NO LEIDO', 'EN PROCESO', 'RESUELTO', 'ELIMINADO')),
    CONSTRAINT CHK_History_Status_New CHECK (new_status IN ('NO LEIDO', 'EN PROCESO', 'RESUELTO', 'ELIMINADO'));
GO

-- Admin_Notes Table
CREATE TABLE Admin_Notes (
    id_note INT IDENTITY(1,1) PRIMARY KEY,
    id_report INT NOT NULL,
    admin_message NVARCHAR(500) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    last_update_at DATETIME DEFAULT GETDATE(),
    is_deleted BIT DEFAULT 0,
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);
GO

-- Attachments Table
CREATE TABLE Attachments (
    id_attachment INT IDENTITY(1,1) PRIMARY KEY,
    id_report INT NOT NULL,
    attachment_type VARCHAR(20) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    uploaded_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);
GO

ALTER TABLE Attachments
ADD CONSTRAINT CHK_Attachments_Type CHECK (attachment_type IN ('IMAGE', 'DOCUMENT'));
GO

-- Messages Table
CREATE TABLE Messages (
    id_message INT IDENTITY(1,1) PRIMARY KEY,
    id_report INT NOT NULL,
    sender_type VARCHAR(10) NOT NULL,
    message_content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    is_read BIT DEFAULT 0,
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);
GO

ALTER TABLE Messages
ADD CONSTRAINT CHK_Messages_Sender CHECK (sender_type IN ('USER', 'ADMIN'));
GO

-- Admins Table
CREATE TABLE Admins (
    id_admin INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    reset_token VARCHAR(255),
    reset_token_expiry DATETIMEOFFSET
);
GO

-- Example Admin (safe placeholder, replace in production)
-- INSERT INTO Admins (username, email, password_hash) VALUES ('admin_user', 'admin@example.com', '<hashed_password>');

-- Example User (optional)
-- INSERT INTO Users (email) VALUES ('anonymous@example.com');

-- Login setup and permissions are removed from public version for security.
-- Use environment-secured methods or setup instructions outside the public SQL file.

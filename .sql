USE clinica;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS Messages;
DROP TABLE IF EXISTS Report_Status_History;
DROP TABLE IF EXISTS Admin_Notes;
DROP TABLE IF EXISTS Attachments;

CREATE TABLE Users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT NOW()
);
ALTER TABLE Users AUTO_INCREMENT = 2;
INSERT INTO Users (id_user, email) VALUES (1, 'anonymous@clinica.com')
ON DUPLICATE KEY UPDATE email = 'anonymous@clinica.com';
select * from users;
select * from reports;

CREATE TABLE Reports (
    id_report INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,                          
    report_code VARCHAR(10) UNIQUE,                
    department VARCHAR(100) NOT NULL,              
    location VARCHAR(100) NOT NULL,                
    subject VARCHAR(255) NOT NULL,                 
    description TEXT NOT NULL,                     
    suggestions TEXT,                              
    status ENUM('No leído', 'En proceso', 'Resuelto', 'Eliminado') DEFAULT 'No leído',
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME DEFAULT NOW() ON UPDATE NOW(),
    FOREIGN KEY (id_user) REFERENCES Users(id_user) ON DELETE CASCADE
);

ALTER TABLE Reports
ADD COLUMN profession VARCHAR(100) NOT NULL,
ADD COLUMN is_consequent ENUM('yes', 'no') DEFAULT 'no',
ADD COLUMN avoidable ENUM('yes', 'no') DEFAULT 'no',
ADD COLUMN consequence_type TEXT;


CREATE TABLE Report_Status_History (
    id_history INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,                        
    old_status ENUM('No leído', 'En proceso', 'Resuelto', 'Eliminado'),
    new_status ENUM('No leído', 'En proceso', 'Resuelto', 'Eliminado') NOT NULL,
    changed_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

CREATE TABLE Admin_Notes (
    id_note INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,                        
    admin_message TEXT NOT NULL,                   
    created_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

ALTER TABLE Admin_Notes
ADD COLUMN last_update_at DATETIME DEFAULT NOW() ON UPDATE NOW();

ALTER TABLE Admin_Notes
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;



CREATE TABLE Attachments (
    id_attachment INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,                        
    attachment_type ENUM('image', 'document') NOT NULL,
    file_path VARCHAR(255) NOT NULL,               
    uploaded_at DATETIME DEFAULT NOW(),
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

CREATE TABLE Messages (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    id_report INT NOT NULL,                        
    sender_type ENUM('user', 'admin') NOT NULL,    
    message_content TEXT NOT NULL,                 
    created_at DATETIME DEFAULT NOW(),             
    is_read BOOLEAN DEFAULT false,                 
    FOREIGN KEY (id_report) REFERENCES Reports(id_report) ON DELETE CASCADE
);

CREATE TABLE Admins (
    id_admin INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT NOW()
);
INSERT INTO admins (username, email, password_hash)
VALUES (
  'Pragati',
  'juyalpragati9991@gmail.com',
  '$2b$10$OH9JfnODDpEzEj9s.vqUcOARmeByaowfzMn.d4WY7yBiJwUz6wde.'
);

SELECT * FROM admins;


-- Insert a test user
INSERT INTO Users (email) VALUES ('testuser@example.com');

-- Insert a test report
INSERT INTO Reports (id_user, report_code, department, location, subject, description, suggestions, status)
VALUES (
    1,                         
    'TEST1234',                
    'Cardiología',             
    'Room 301',                
    'Broken Equipment',        
    'The ECG machine is not functioning properly.', 
    'Consider replacing the machine',              
    'NO LEIDO'                
);

-- Insert a test message
INSERT INTO Messages (id_report, sender_type, message_content)
VALUES (1, 'admin', 'Hello, we are reviewing your report.');

ALTER TABLE Reports MODIFY id_user INT NOT NULL DEFAULT 0;

ALTER USER 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '124578';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '124578';
FLUSH PRIVILEGES;

INSERT INTO Users (id_user, email) VALUES (1, 'anonymous@clinica.com')
ON DUPLICATE KEY UPDATE email = 'anonymous@clinica.com';

select * from reports where status='eliminado';
select * from reports;
select * from attachments;
select * from users;
select * from report_status_history;
select * from admin_notes;
select * from messages;
select * from admins;

CREATE TABLE admins (
  id_admin INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (email, password_hash)
VALUES (
  'juyalpragati9991@gmail.com',
  '$2b$10$BWcGwf4COEbOHDTpQdX7wul2.RHuHEaETqE7IJ1JUswAv5E0dN26a'
);

SELECT id_report, location, created_at FROM reports WHERE report_code = 'TEST1234';

ALTER TABLE Reports ADD COLUMN is_flagged BOOLEAN DEFAULT FALSE;
-- Database layout for Student Face Registration & Attendance Loggers

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    roll_number TEXT NOT NULL UNIQUE,
    image_path TEXT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    FOREIGN KEY(name) REFERENCES students(name)
);

-- Seed Initial Profiles
INSERT OR IGNORE INTO students (name, roll_number, image_path) VALUES
('Balamurugan C', 'AI2301', 'faces/balamurugan.jpg'),
('Aravind Kumar', 'AI2302', 'faces/aravind.jpg'),
('Sneha Ram', 'AI2303', 'faces/sneha.jpg');

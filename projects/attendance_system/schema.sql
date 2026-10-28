-- Smart Institutional Attendance & Academic Governance ERP Schema
-- PostgreSQL / SQLite Enterprise Relational Layout

-- 1. Departments & Academic Hierarchy
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE, -- e.g., 'AIDS', 'CSE', 'ECE'
    hod_name VARCHAR(120),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. User Credentials & 5-Tier RBAC
-- Roles: 'ADMIN', 'HOD', 'CLASS_ADVISOR', 'FACULTY', 'STUDENT'
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'HOD', 'CLASS_ADVISOR', 'FACULTY', 'STUDENT')),
    department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Student Master Directory
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    roll_number VARCHAR(20) NOT NULL UNIQUE,
    register_number VARCHAR(20) NOT NULL UNIQUE,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    academic_year INTEGER NOT NULL, -- e.g., 2026
    semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
    section VARCHAR(5) NOT NULL,    -- e.g., 'A', 'B'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Master Timetable Definition with IST Slot Intervals
CREATE TABLE IF NOT EXISTS timetable_periods (
    id SERIAL PRIMARY KEY,
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    section VARCHAR(5) NOT NULL,
    day_of_week VARCHAR(10) NOT NULL CHECK (day_of_week IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY')),
    period_number INTEGER NOT NULL CHECK (period_number BETWEEN 1 AND 8),
    start_time_ist TIME NOT NULL, -- e.g., '09:00:00'
    end_time_ist TIME NOT NULL,   -- e.g., '09:50:00'
    subject_code VARCHAR(20) NOT NULL,
    subject_name VARCHAR(120) NOT NULL,
    faculty_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    UNIQUE(department_id, semester, section, day_of_week, period_number)
);

-- 5. Student Attendance Records (Period-Level Precision)
CREATE TABLE IF NOT EXISTS attendance_records (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    period_id INTEGER NOT NULL REFERENCES timetable_periods(id) ON DELETE RESTRICT,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(15) NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'ON_DUTY')),
    marked_by_faculty_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    is_od_protected BOOLEAN DEFAULT FALSE,
    marked_at_ist TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(date, period_id, student_id)
);

-- 6. Automated On-Duty (OD) Governance System
CREATE TABLE IF NOT EXISTS on_duty_requests (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    event_title VARCHAR(150) NOT NULL,
    event_category VARCHAR(50) NOT NULL, -- 'SYMPOSIUM', 'HACKATHON', 'SPORTS', 'CULTURAL'
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    period_start INTEGER CHECK (period_start BETWEEN 1 AND 8),
    period_end INTEGER CHECK (period_end BETWEEN 1 AND 8),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ADVISOR_APPROVED', 'HOD_APPROVED', 'REJECTED')),
    advisor_verified_by INTEGER REFERENCES users(id),
    hod_endorsed_by INTEGER REFERENCES users(id),
    supporting_document_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Audit Logging Provenance Tracker
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    entity_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    performed_by INTEGER NOT NULL REFERENCES users(id),
    client_ip VARCHAR(45),
    justification_note TEXT,
    timestamp_ist TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Performance Composite Indices
CREATE INDEX IF NOT EXISTS idx_attendance_composite ON attendance_records(student_id, date, period_id);
CREATE INDEX IF NOT EXISTS idx_timetable_lookup ON timetable_periods(department_id, semester, section, day_of_week);
CREATE INDEX IF NOT EXISTS idx_od_student ON on_duty_requests(student_id, from_date, to_date, status);

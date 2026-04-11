-- Create database if not exists
CREATE DATABASE IF NOT EXISTS campus_resource_db;
USE campus_resource_db;

-- Drop tables if they already exist to avoid errors on multiple runs
DROP TABLE IF EXISTS borrow_requests;
DROP TABLE IF EXISTS resources;
DROP TABLE IF EXISTS users;

-- ==========================================
-- 1. Create users table
-- ==========================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. Create resources table
-- ==========================================
CREATE TABLE resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    condition_status VARCHAR(50) NOT NULL,
    availability_status VARCHAR(50) NOT NULL DEFAULT 'AVAILABLE',
    owner_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- 3. Create borrow_requests table
-- ==========================================
CREATE TABLE borrow_requests (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    resource_id BIGINT NOT NULL,
    borrower_id BIGINT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    request_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    return_date DATETIME,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
    FOREIGN KEY (borrower_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ==========================================
-- Insert Sample Test Data
-- ==========================================

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Alice Smith', 'alice@university.edu', 'hashed_pass_1', 'USER'),
('Bob Johnson', 'bob@university.edu', 'hashed_pass_2', 'USER'),
('Admin User', 'admin@university.edu', 'hashed_pass_admin', 'ADMIN');

-- Insert sample resources (Linking to owner_id 1 and 2)
INSERT INTO resources (title, category, description, condition_status, availability_status, owner_id) VALUES
('Introduction to Algorithms Book', 'Textbook', 'Cormen, 3rd Edition', 'GOOD', 'AVAILABLE', 1),
('Scientific Calculator', 'Electronics', 'Casio FX-991EX', 'NEW', 'AVAILABLE', 1),
('Arduino Uno Kit', 'Hardware', 'Complete starter kit with sensors', 'FAIR', 'BORROWED', 2);

-- Insert sample borrow requests
INSERT INTO borrow_requests (resource_id, borrower_id, status, request_date, return_date) VALUES
(3, 1, 'APPROVED', CURRENT_TIMESTAMP - INTERVAL 2 DAY, NULL),
(1, 2, 'PENDING', CURRENT_TIMESTAMP, NULL);

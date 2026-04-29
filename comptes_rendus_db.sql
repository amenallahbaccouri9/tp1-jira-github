-- =============================================
-- DATABASE: comptes_rendus_db
-- Import this file in phpMyAdmin
-- =============================================

CREATE DATABASE IF NOT EXISTS comptes_rendus_db CHARACTER SET utf8 COLLATE utf8_general_ci;
USE comptes_rendus_db;

-- =============================================
-- TABLE: tuteurs
-- =============================================
CREATE TABLE IF NOT EXISTS tuteurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLE: etudiants
-- =============================================
CREATE TABLE IF NOT EXISTS etudiants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- TABLE: comptes_rendus
-- =============================================
CREATE TABLE IF NOT EXISTS comptes_rendus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    etudiant_id INT NOT NULL,
    semaine VARCHAR(50) NOT NULL,
    fichier VARCHAR(255) DEFAULT NULL,
    date_depot DATE DEFAULT NULL,
    statut ENUM('Déposé', 'En attente', 'En retard') DEFAULT 'En attente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (etudiant_id) REFERENCES etudiants(id)
);

-- =============================================
-- DATA: tuteurs
-- Password is: 1234 (hashed with bcrypt)
-- =============================================
INSERT INTO tuteurs (nom, email, password) VALUES
('Dr. Tuteur', 'tuteur@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- =============================================
-- DATA: etudiants
-- =============================================
INSERT INTO etudiants (nom, email) VALUES
('Ahmed Ben Ali', 'ahmed@etudiant.com'),
('Sarra Trabelsi', 'sarra@etudiant.com'),
('Mohamed Chaabane', 'med@etudiant.com'),
('Yasmine Khelifi', 'yasmine@etudiant.com'),
('Karim Mansouri', 'karim@etudiant.com'),
('Nour Belhaj', 'nour@etudiant.com'),
('Ines Hamdi', 'ines@etudiant.com'),
('Fares Jouini', 'fares@etudiant.com');

-- =============================================
-- DATA: comptes_rendus
-- =============================================
INSERT INTO comptes_rendus (etudiant_id, semaine, fichier, date_depot, statut) VALUES
(1, 'Semaine 1', 'rapport_s1_ahmed.pdf', '2026-04-20', 'Déposé'),
(2, 'Semaine 1', 'rapport_s1_sarra.pdf', '2026-04-21', 'Déposé'),
(3, 'Semaine 1', NULL, NULL, 'En attente'),
(4, 'Semaine 2', 'rapport_s2_yasmine.pdf', '2026-04-25', 'Déposé'),
(5, 'Semaine 2', NULL, NULL, 'En retard'),
(6, 'Semaine 2', NULL, NULL, 'En attente'),
(7, 'Semaine 3', 'rapport_s3_ines.pdf', '2026-04-28', 'Déposé'),
(8, 'Semaine 3', NULL, NULL, 'En retard');

<?php
// backend/db.php
$host = 'localhost';
$dbname = 'comptes_rendus_db';
$username = 'root';
$password = '';  // XAMPP default password is empty

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Connexion DB échouée: ' . $e->getMessage()]);
    exit;
}
?>

<?php
// backend/login.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Champs manquants']);
    exit;
}

$stmt = $pdo->prepare("SELECT * FROM tuteurs WHERE email = ?");
$stmt->execute([$email]);
$tuteur = $stmt->fetch(PDO::FETCH_ASSOC);

if ($tuteur && password_verify($password, $tuteur['password'])) {
    echo json_encode([
        'success' => true,
        'nom' => $tuteur['nom'],
        'email' => $tuteur['email']
    ]);
} else {
    echo json_encode(['success' => false, 'message' => 'Identifiants incorrects']);
}
?>

<?php
// backend/get_reports.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'db.php';

$stmt = $pdo->query("
    SELECT cr.id, e.nom, e.email, cr.semaine, cr.fichier, cr.date_depot, cr.statut
    FROM comptes_rendus cr
    JOIN etudiants e ON cr.etudiant_id = e.id
    ORDER BY cr.semaine, e.nom
");

$reports = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($reports);
?>

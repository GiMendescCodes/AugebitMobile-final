<?php
header('Content-Type: application/json');
$host = 'localhost';
$username = 'root';
$password = '';

try {
    $pdo_solicitacoes = new PDO("mysql:host=$host;dbname=solicitacoes;charset=utf8", $username, $password);
    $pdo_solicitacoes->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo_justificativas = new PDO("mysql:host=$host;dbname=justificativas;charset=utf8", $username, $password);
    $pdo_justificativas->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql_solicitacoes = "SELECT id, data_escolhida, opcao FROM dados ORDER BY data_escolhida DESC";
    $solicitacoes = $pdo_solicitacoes->query($sql_solicitacoes)->fetchAll(PDO::FETCH_ASSOC);

    $sql_justificativas = "SELECT id, data_escolhida, opcao FROM justificativas ORDER BY data_escolhida DESC";
    $justificativas = $pdo_justificativas->query($sql_justificativas)->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'solicitacoes' => $solicitacoes,
        'justificativas' => $justificativas
    ]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

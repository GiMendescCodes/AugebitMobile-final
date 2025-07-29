<?php
// api/verifica_funcionario.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ajuste conforme necessidade

$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "semestral";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Falha na conexão']);
    exit;
}

$cpf = $_GET['cpf'] ?? '';
$nome = $_GET['nome'] ?? '';

if (!$cpf || !$nome) {
    echo json_encode(['success' => false, 'message' => 'CPF e nome obrigatórios']);
    exit;
}

// Segurança básica: preparar statement para evitar SQL Injection
$stmt = $conn->prepare("SELECT id FROM funcionarios WHERE cpf = ? AND nome = ?");
$stmt->bind_param("ss", $cpf, $nome);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Funcionário não encontrado']);
}

$stmt->close();
$conn->close();

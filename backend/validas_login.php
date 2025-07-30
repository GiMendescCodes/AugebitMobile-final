<?php
// Desliga a exibição de erros para evitar que warnings quebrem o JSON
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

// Inicia buffer de saída para garantir que não haja saída antes do JSON
ob_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "semestral";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Falha na conexão: ' . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$cpf = isset($data['cpf']) ? trim($data['cpf']) : '';
$nome = isset($data['nome']) ? trim($data['nome']) : '';

if (!$cpf || !$nome) {
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'CPF e nome obrigatórios']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM funcionarios WHERE cpf = ? AND nome = ?");
if (!$stmt) {
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Erro na consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $cpf, $nome);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    ob_clean();
    echo json_encode(['success' => true, 'message' => 'Funcionário encontrado']);
    exit;
} else {
    ob_clean();
    echo json_encode(['success' => false, 'message' => 'Funcionário não encontrado']);
    exit;
}

$stmt->close();
$conn->close();
ob_end_flush();


<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";       // coloque seu usuário real
$password = "";           // coloque sua senha real
$dbname = "semestral";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Falha na conexão: ' . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$cpf = $data['cpf'] ?? '';
$nome = $data['nome'] ?? '';

if (!$cpf || !$nome) {
    echo json_encode(['success' => false, 'message' => 'CPF e nome obrigatórios']);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM funcionarios WHERE cpf = ? AND nome = ?");
$stmt->bind_param("ss", $cpf, $nome);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Funcionário encontrado']);
} else {
    echo json_encode(['success' => false, 'message' => 'Funcionário não encontrado']);
}

$stmt->close();
$conn->close();

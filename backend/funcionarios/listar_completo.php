<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include __DIR__ . '/../conexao.php'; // caminho correto para conexao.php

header('Content-Type: application/json');

$sql = "SELECT f.id, f.nome, f.email, f.telefone, f.cpf, f.foto,
               p.cargo, p.setor, p.horario_entrada, p.horario_saida, p.salario
        FROM funcionarios f
        LEFT JOIN profissional p ON f.id = p.funcionario_id";

$result = $conn->query($sql);

// VERIFICA SE A QUERY FOI BEM-SUCEDIDA
if ($result === false) {
    die(json_encode(['error' => "Erro na consulta SQL: " . $conn->error]));
}

$dados = [];

while ($row = $result->fetch_assoc()) {
    // Converte salário para float para evitar problemas no frontend
    $row['salario'] = floatval($row['salario']);
    $dados[] = $row;
}

echo json_encode($dados);

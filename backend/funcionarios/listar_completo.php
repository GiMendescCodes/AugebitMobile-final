<?php
include '../../conexao.php';
header('Content-Type: application/json');

$sql = "SELECT f.id, f.nome, f.email, f.telefone, f.cpf, f.foto,
               p.cargo, p.setor, p.horario_entrada, p.horario_saida, p.salario
        FROM funcionarios f
        LEFT JOIN profissional p ON f.id = p.funcionario_id";

$result = $conn->query($sql);

$dados = [];

while ($row = $result->fetch_assoc()) {
    // Converte salário para float para evitar problemas no frontend
    $row['salario'] = floatval($row['salario']);
    $dados[] = $row;
}

echo json_encode($dados);

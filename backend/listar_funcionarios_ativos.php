<?php
include 'conexao.php';

$horaAtual = date("H:i:s");

$sql = "SELECT f.id, f.nome, f.foto, p.setor, p.cargo
        FROM funcionarios f
        JOIN profissional p ON f.id = p.funcionario_id
        WHERE (
            p.horario_entrada <= ? AND p.horario_saida >= ? AND p.horario_entrada <= p.horario_saida
        ) OR (
            p.horario_entrada > p.horario_saida AND (
                ? >= p.horario_entrada OR ? <= p.horario_saida
            )
        )";

$stmt = $conn->prepare($sql);
if ($stmt === false) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("ssss", $horaAtual, $horaAtual, $horaAtual, $horaAtual);
$stmt->execute();

$result = $stmt->get_result();
$dados = [];

while ($row = $result->fetch_assoc()) {
    $dados[] = $row;
}

echo json_encode($dados);
?>

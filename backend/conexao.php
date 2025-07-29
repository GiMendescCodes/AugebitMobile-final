<?php
$servername = "localhost";
$username = "root";
$password = "";  // normalmente vazio no XAMPP
$dbname = "semestral";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>

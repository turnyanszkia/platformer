<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pontszamok";

// Adatbázis kapcsolat létrehozása
$conn = new mysqli($servername, $username, $password, $dbname);

// Kapcsolat ellenőrzése
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Metódus ellenőrzése
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    // Adatok fogadása
    $data = json_decode(file_get_contents("php://input"), true);
    $name = $conn->real_escape_string($data['name']);
    $score = (int)$data['score'];

    // Adatok mentése az adatbázisba
    $sql = "INSERT INTO scores (name, score) VALUES ('$name', $score)";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Score saved successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . " - " . $conn->error]);
    }
} elseif ($method === 'GET') {
    // Pontszámok lekérése
    $result = $conn->query("SELECT name, score, created_at FROM scores ORDER BY score DESC");

    $scores = [];
    while ($row = $result->fetch_assoc()) {
        $scores[] = $row;
    }

    echo json_encode($scores);
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

// Kapcsolat lezárása
$conn->close();
?>
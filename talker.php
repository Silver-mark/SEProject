<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "carrotscores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false, 
        'message' => "Connection failed: " . $conn->connect_error
    ]));
}

function insert($playerName, $score) {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO scores (playerName, playerScore) VALUES (?, ?)");
    $stmt->bind_param("si", $playerName, $score);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

function scoreReturn() {
    global $conn;
    $sql = "SELECT playerName, playerScore FROM scores ORDER BY playerScore DESC LIMIT 10";
    $result = $conn->query($sql);
    
    $scores = array();
    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $scores[] = $row;
        }
    }
    return $scores;
}

// Handle requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['playerName']) && isset($data['score'])) {
        $result = insert($data['playerName'], $data['score']);
        echo json_encode(['success' => $result]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $scores = scoreReturn();
    echo json_encode(['success' => true, 'scores' => $scores]);
}

$conn->close();
?>

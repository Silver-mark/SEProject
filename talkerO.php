<?php
$servername = "localhost";
$username = "root";
$password = "1234";
$dbname = "carrotscores";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
void insert(String playerName, Int score)
{
	$sql = INSERT INTO carrotscores.scores (playerName, playerScore)
    VALUES (playerName,score);
}

String scoreReturn()
{
$sql = "SELECT playerName, playerScore FROM carrotscores.scores ORDER BY playerScore Desc LIMIT 10";
$result = $conn->query($sql);

String scores;

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) 
	{
        scores += "<br> id: ". $row["id"]. " - Name: ". $row ["firstname"]. " " . $row["lastname"] . "<br>";
    }
} else {
    echo "0 results";
}
}

$conn->close();
?>

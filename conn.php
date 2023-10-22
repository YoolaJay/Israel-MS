<?php
// Connect to the database
$host = 'localhost:3308';
$dbname = 'israel';
$username = 'root';
$password = '';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);

// Register user
// if ($_POST['action'] === 'register') {
//   $username = $_POST['username'];
//   $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
  
//   // Check if the username is already in the database
//   $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
//   $stmt->execute(['username' => $username]);
//   $user = $stmt->fetch();
  
//   if ($user) {
//     echo json_encode(['message' => 'Username already exists']);
//   } else {
//     $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
//     if ($stmt->execute(['username' => $username, 'password' => $password])) {
//       echo json_encode(['message' => 'Registration successful']);
//     } else {
//       echo json_encode(['message' => 'Registration failed']);
//     }
//   }
// }

// Authenticate user
if ($_POST['action'] === 'login') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare("SELECT id, username, password FROM users WHERE username = :username");
  $stmt->execute(['username' => $username]);
  $user = $stmt->fetch();

  if ($user && password_verify($password, $user['password'])) {
    echo json_encode(['message' => 'Login successful']);
  } else {
    echo json_encode(['message' => 'Login failed']);
  }
}

<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $name = $data['name'];
  $email = $data['email'];
  $password = $data['password'];

  $userManager = new UsersManager();
  $response = $userManager->createUser($name, $email, $password);
  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>
<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $email = $_GET['email'];

  $userManager = new UsersManager();
  $response = $userManager->getUserByEmail($email);

  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}

?>
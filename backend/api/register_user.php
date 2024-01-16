<?php

require_once 'class/UsersManager.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  $name = $data['name'];
  $email = $data['email'];
  $password = $data['password'];

  $userManager = new UsersManager();
  $response = $userManager->createUser($name, $email, $password);
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
  header("Access-Control-Allow-Methods: POST");
  header("Allow:  POST");
  header('Content-Type: application/json');
  echo json_encode($response);
} else {
  echo json_encode(['error' => 'Invalid request method']);
}


?>